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

export interface ExportData
{
	version: string,
	time: string,
	dungeon: ExportDungeon,
	layers: any // TODO
}

export interface Preview
{
	time: string,
	thumbnail: string,
}

interface ParamsReq
{
	dungeon: Dungeon;
}

export class IOManager
{
	get dialog(): boolean
	{
		return this._dialog;
	}

	set dialog(value: boolean)
	{
		this._dialog = value;
	}
	get keys(): string[]
	{
		return this._keys;
	}

	private dungeon: Dungeon;
	private data;
	private previews;
	private _keys: string[] = [];
	private _dialog: boolean = false;

	constructor(req: ParamsReq)
	{
		this.dungeon = req.dungeon;

		makeAutoObservable(this);

		this.data = localforage.createInstance({
			name: 'dungeons',
			storeName: 'data',
		});

		this.previews = localforage.createInstance({
			name: 'dungeons',
			storeName: 'previews',
		});

		this.refreshKeys();

	}

	private export(): ExportData
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
			dungeon: this.dungeon.export(),
			layers,
		};
	}

	private exportPreview(): Preview
	{
		return {
			time: Date(),
			thumbnail: this.dungeon.getDataUrl(),
		};
	}

	public getPreview(id: string)
	{
		return this.previews.getItem(id);
	}

	/**
	 * Refresh the intenal list of keys
	 */
	async refreshKeys()
	{
		this._keys = await this.previews.keys();
	}

	public async delete(id: string)
	{
		await this.data.removeItem(id);
		await this.previews.removeItem(id);
		this.refreshKeys()
	}

	public async save(id: string)
	{
		await this.data.setItem(id, this.export());
		await this.previews.setItem(id, this.exportPreview());
		await this.refreshKeys()
	}

	public async load(id: string)
	{
		const data: ExportData | null = await this.data.getItem(id);
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
			layer.import(item);
			this.dungeon.importLayer(item.id, layer);
		}
		this.dungeon.setSize();
	}

}