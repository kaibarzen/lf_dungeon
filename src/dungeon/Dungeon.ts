import {Layer} from './layer/Layer';
import {DevLayer} from './layer/Dev';
import {makeAutoObservable, toJS} from 'mobx';
import {SolidLayer} from './layer/Solid';
import {number} from 'prop-types';

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
	SOLID,
}

interface TreeNode
{
	title: string,
	key: number,
	children: TreeNode[]
}

export class Dungeon
{
	get treeChecked(): number[]
	{
		return this._treeChecked;
	}

	get selectedLayer(): Layer | undefined
	{
		return this._selectedLayer;
	}

	get tree(): TreeNode[]
	{
		return this._tree;
	}

	/**
	 * Update the tree, calls dungeon.render
	 * @param value
	 */
	set tree(value: TreeNode[])
	{
		this._tree = value;
		this.render();
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

	private context: CanvasRenderingContext2D | undefined;

	private layers: { [key: number]: Layer } = {};
	private _tree: TreeNode[] = [];
	private _treeChecked: number[] = [];

	private _selectedLayer: Layer | undefined;

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
		const context = canvas.getContext('2d');
		if (!context)
		{
			throw new Error('Could not create canvas 2d context');
		}
		this.context = context;
		this.resize();
	}

	/**
	 * Set's size variables in class and forces a resize()
	 * @param width
	 * @param height
	 * @param cellWidth
	 * @param cellHeight
	 */
	public setSize({
		               width = this._width,
		               height = this._height,
		               cellWidth = this._cellWidth,
		               cellHeight = this._cellHeight,
	               } = {}): void
	{
		this._width = width;
		this._height = height;
		this._cellWidth = cellWidth;
		this._cellHeight = cellHeight;
		this._totalWidth = width * cellWidth;
		this._totalHeight = height * cellHeight * 0.5;
		this.resize();
	}

	/**
	 * Resize all, force layers to resize/rerender
	 */
	private resize(): void
	{
		if (!this.context)
		{
			return;
		}
		this.context.canvas.width = this._totalWidth;
		this.context.canvas.height = this._totalHeight;

		for (const [key, layer] of Object.entries(this.layers))
		{
			layer.resize();
		}
	}

	/**
	 * Transforms the layer id into the layer class and sets it as the currently selected layer
	 * @param value
	 */
	public setSelectedLayer(value: number)
	{
		this._selectedLayer = this.layers[value];
	}

	/**
	 * Add a layer, returns the id
	 * @param type
	 */
	public addLayer(type: Layers): number
	{

		let newLayer: any;

		switch (type)
		{
			case Layers.BACKGROUND:
				break;
			case Layers.COMPOSITE:
				break;
			case Layers.DEV:
				newLayer = DevLayer;
				break;
			case Layers.FOLDER:
				break;
			case Layers.GRID:
				break;
			case Layers.TILE:
				break;
			case Layers.SOLID:
				newLayer = SolidLayer;
				break;
			default:
				throw new Error('Type of Layer does not exist');
		}

		if (newLayer === undefined)
		{
			throw new Error('Type of Layer is probably not implemented yet.');
		}

		this.idCounter++;

		const required = {dungeon: this, id: this.idCounter};
		const params = {name: `Unnamed Layer - ${this.idCounter}`};
		newLayer = new newLayer(required, params);
		this.layers[this.idCounter] = newLayer;

		this._tree.push({
			title: newLayer.name,
			children: [],
			key: this.idCounter,
		});
		this._treeChecked.push(this.idCounter);

		newLayer.render();

		return this.idCounter;
	}

	/**
	 * Rename a node int he tree by key // TOdo early return
	 * @param key
	 * @param name
	 */
	public renameTree(key: number, name: string)
	{
		const loop = (node: TreeNode) =>
		{
			if (node.key === key)
			{
				node.title = name;
				return;
			}

			for (const item of node.children)
			{
				loop(item);
			}
		};
		for (const item of this._tree)
		{
			loop(item);
		}

	}

	/**
	 * Check or uncheck an element on the tree by key, called by layer opt check change, calls rerender
	 * @param key
	 * @param checked
	 */
	public checkTree(key: number, checked: boolean)
	{
		if (checked && !this._treeChecked.includes(key))
		{
			this._treeChecked.push(key);
		}
		else if (!checked)
		{
			if (this._treeChecked.indexOf(key) !== -1)
			{
				this._treeChecked.splice(this._treeChecked.indexOf(key), 1);
			}
		}
		this.render()
	}

	/**
	 *  Enable/Check or uncheck an layer by key, called by tree check change,
	 * @param key
	 * @param checked
	 */
	public checkLayer(key: number, checked: boolean)
	{
		const layer = this.layers[key];
		if (layer)
		{
			layer.setEnabled(checked);
		}
	}

	/**
	 * Remove a layer by id
	 * @param id
	 */
	public removeLayer(id: number): void
	{
		// TODO
	}

	/**
	 * Disable/Uncheck an array of layer ids, rerenders at dungeon
	 * @param ids
	 */
	public enableLayers(ids: number[])
	{
		this.setEnabled(true, ids);
	}

	/**
	 * Enable/Check an array of layer ids, rerenders at dungeon
	 * @param ids
	 */
	public disableLayers(ids: number[])
	{
		this.setEnabled(false, ids);
	}

	/**
	 * Enable/Disable an array of layers ids, rerenders at dungeon
	 * @param enabled
	 * @param ids
	 */
	private setEnabled(enabled: boolean, ids: number[])
	{
		for (const item of ids)
		{
			this.layers[item].enabled = enabled;
		}
		this.render();
	}

	/**
	 * Render Class, gets callbacked by the layers itself if changes happen or by this class on tree changes
	 */
	render()
	{
		if (!this.context)
		{
			console.warn('No context/canvas to render on');
			return;
		}

		this.context.clearRect(0, 0, this._totalWidth, this._totalHeight);

		const loop = (node: TreeNode) =>
		{
			const layer = this.layers[node.key];

			if (!layer.enabled)
			{
				return;
			}

			if (node.children.length)
			{
				node.children.reverse();
				for (const item of node.children)
				{
					loop(item);
				}
			}
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