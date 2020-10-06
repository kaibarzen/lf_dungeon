import {Layer} from './layer/Layer';
import {DevLayer} from './layer/Dev';
import {makeAutoObservable} from 'mobx';

export interface Constructor
{
	width?: number,
	height?: number,
	cellWidth?: number,
	cellHeight?: number,
	canvas?: HTMLCanvasElement
}

export enum Layers
{
	BACKGROUND,
	COMPOSITE,
	DEV,
	FOLDER,
	GRID,
	TILE,
}

interface TreeNode
{
	title: string,
	key: number,
	children: TreeNode[]
}

export class Dungeon
{
	get tree(): TreeNode[]
	{
		return this._tree;
	}

	set tree(value: TreeNode[])
	{
		this._tree = value;
	}

	get height(): number
	{
		return this._height;
	}

	get width(): number
	{
		return this._width;
	}

	get cellHeight(): number
	{
		return this._cellHeight;
	}

	get cellWidth(): number
	{
		return this._cellWidth;
	}

	get totalHeight(): number
	{
		return this._totalHeight;
	}

	get totalWidth(): number
	{
		return this._totalWidth;
	}

	private _cellWidth: number = 100; // Cell in px
	private _cellHeight: number = 50;
	private _width: number = 10; // How Many cells
	private _height: number = 20;
	private _totalWidth: number = 0; // Total size in px
	private _totalHeight: number = 0;

	private idCounter: number = 0;

	private canvas: HTMLCanvasElement | undefined;
	private context: CanvasRenderingContext2D | undefined;

	private layers: { [key: number]: Layer } = {};
	private _tree: TreeNode[] = [];

	constructor(con: Constructor | undefined)
	{
		makeAutoObservable(this);

		if (con?.canvas)
		{
			this.setCanvas(con.canvas);
		}
		this.setSize(con);
	}

	/**
	 * Define an canvas the end results renders on
	 * @param canvas
	 */
	public setCanvas(canvas: HTMLCanvasElement)
	{
		this.canvas = canvas;
		const context = canvas.getContext('2d');
		if (!context)
		{
			throw new Error('Could not create canvas 2d context');
		}
		this.context = context;
		this.resize();
	}

	public async setSize({
		                     width = this._width,
		                     height = this._height,
		                     cellWidth = this._cellWidth,
		                     cellHeight = this._cellHeight,
	                     } = {}): Promise<void>
	{
		this._width = width;
		this._height = height;
		this._cellWidth = cellWidth;
		this._cellHeight = cellHeight;
		this._totalWidth = width * cellWidth;
		this._totalHeight = height * cellHeight * 0.5;
		await this.resize();
	}

	/**
	 * Resize all, force layers to rerender
	 */
	private async resize(): Promise<void>
	{
		if (!this.canvas)
		{
			return;
		}
		this.canvas.width = this._totalWidth;
		this.canvas.height = this._totalHeight;
	}

	/**
	 * Add a layer, returns the id
	 * @param type
	 */
	public addLayer(type: Layers): number
	{

		let newLayer: undefined | Layer;

		switch (type)
		{
			case Layers.BACKGROUND:
				break;
			case Layers.COMPOSITE:
				break;
			case Layers.DEV:
				newLayer = new DevLayer(this, undefined);
				break;
			case Layers.FOLDER:
				break;
			case Layers.GRID:
				break;
			case Layers.TILE:
				break;
			default:
				throw new Error('Type of Layer does not exist');
		}

		if (newLayer === undefined)
		{
			throw new Error('Type of Layer is probably not implemented yet.');
		}

		this.idCounter++;
		this.layers[this.idCounter] = newLayer;

		this._tree.push({
			title: `Unnamed - ${this.idCounter}`,
			children: [],
			key: this.idCounter,
		});

		newLayer.render()

		return this.idCounter;
	}

	/**
	 * Remove a layer by id
	 * @param id
	 */
	public removeLayer(id: number): void
	{

	}

	/**
	 * Render Class, gets callbacked by Layers
	 */
	render()
	{
		console.log("RENDER CALLED")

		if (!this.canvas || !this.context)
		{
			console.warn('Dungeon render no canvas or context found');
			return;
		}

		this.context.clearRect(0, 0, this._totalWidth, this._totalHeight);

		const loop = (node: TreeNode) =>
		{
			if (node.children.length)
			{
				node.children.reverse();
				for (const item of node.children)
				{
					loop(item);
				}
			}
			const layer = this.layers[node.key];
			this.context?.drawImage(layer.getRender(), 0, 0);
		};

		const temp = [...this._tree]; // Make a copy and reverse for bot to top render
		temp.reverse();

		for (const item of temp)
		{
			loop(item);
		}
	}

}