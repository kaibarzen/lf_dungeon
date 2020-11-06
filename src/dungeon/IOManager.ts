import {Dungeon, Layers, TreeNode} from './Dungeon';
import {makeAutoObservable} from 'mobx';
import localforage from 'localforage';
import {BackgroundLayer} from './layer/Background';
import {CompositeLayer} from './layer/Composite';
import {DevLayer} from './layer/Dev';
import {FolderLayer} from './layer/Folder';
import {GridLayer} from './layer/Grid';
import {TileLayer} from './layer/Tile';
import {SolidLayer} from './layer/Solid';

export interface ExportDungeon
{
	width: number,
	height: number,
	cellWidth: number,
	cellHeight: number,
	totalWidth: number,
	totalHeight: number,
	tree: TreeNode[],
	treeChecked: number[],
	idCounter: number,
}

export interface ExportComplete
{
	version: 'string',
	time: 'string',
	title: 'string', // User Title
	dungeon: ExportDungeon,
	layers: any // TODO
}

interface ParamsReq
{
	dungeon: Dungeon;
}

export class IOManager
{

	private dungeon: Dungeon;
	private store;

	constructor(req: ParamsReq)
	{
		this.dungeon = req.dungeon;

		makeAutoObservable(this);

		this.store = localforage.createInstance({
			name: 'dungeons',
			storeName: 'saved',
		});

	}

	public export()
	{
		let layers = [];
		for (const key in this.dungeon.layers)
		{
			const item = this.dungeon.layers[key];
			if (item.id !== -1)
			{
				layers.push(item.export());
			}
		}

		return {
			version: '0.0.0',
			time: Date(),
			title: 'New Export', // Better preview images?
			dungeon: this.dungeon.export(),
			layers,
		};
	}

	public save(id: string)
	{
		const data = this.export();
		this.store.setItem(id, data);
	}

	public async load(id: string)
	{
		const data: ExportComplete | null = await this.store.getItem(id);
		if (!data)
		{
			console.error('Could not Load, debug msg');
			return;
		}
		this.dungeon.import(data.dungeon);

		for (const item of data.layers)
		{

			let newLayer: any;

			switch (item.type)
			{
				case Layers.BACKGROUND:
					newLayer = BackgroundLayer;
					break;
				case Layers.COMPOSITE:
					newLayer = CompositeLayer;
					break;
				case Layers.DEV:
					newLayer = DevLayer;
					break;
				case Layers.FOLDER:
					newLayer = FolderLayer;
					break;
				case Layers.GRID:
					newLayer = GridLayer;
					break;
				case Layers.TILE:
					newLayer = TileLayer;
					break;
				case Layers.SOLID:
					newLayer = SolidLayer;
					break;
				default:
					throw new Error('Type of Layer does not exist');
			}

			const layer = new newLayer({dungeon: this.dungeon, id: item.id}, undefined);
			layer.import(item)
			this.dungeon.importLayer(item.id, layer);
		}
		this.dungeon.setSize();
	}

}