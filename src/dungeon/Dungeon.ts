import {Layer} from './layer/Layer';
import {DevLayer} from './layer/Dev';
import {makeAutoObservable, toJS} from 'mobx';
import {SolidLayer} from './layer/Solid';
import {FolderLayer} from './layer/Folder';
import {GridLayer} from './layer/Grid';
import {CompositeLayer} from './layer/Composite';
import {BackgroundLayer} from './layer/Background';

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

	// Calls render
	set treeChecked(value: number[])
	{
		this._treeChecked = value;
		this.render();
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
		newLayer = new newLayer(required);
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
	 * Remove a layer by id
	 * @param id
	 */
	public removeLayer(id: number): void
	{
		// TODO
	}

	/**
	 * Returns Layer by key/id, returns false of id does not exists
	 * @param id
	 */
	getLayer(id: number): Layer | false
	{
		const layer = this.layers[id];
		if (layer)
		{
			return layer;
		}
		return false;
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

		interface preInterface
		{
			opacity: number,
			composite: string,
			parent: Layer | undefined
		}

		// First Layer of a composite has to be source-over, so this is a checklist
		let compositePlaced: number[] = [];

		/**
		 * Function that draw's the layer to the canvas.
		 * @param layer
		 * @param opacity, calculated opacity through the tree
		 */
		const drawSingle = (layer: Layer, pre: preInterface) =>
		{
			// Already checked this but typescript wants so
			if (!this.context)
			{
				return;
			}

			this.context.save();
			this.context.globalAlpha = pre.opacity;

			// @ts-ignore
			if (pre.parent?.opt.composite)
			{
				if (compositePlaced.includes(pre.parent.id))
				{
					this.context.globalCompositeOperation = pre.composite;
				}
				else
				{
					compositePlaced.push(pre.parent.id);
				}
			}

			this.context.drawImage(layer.getRender(), 0, 0);
			this.context.restore();
		};

		/**
		 * Function to recursively loop to the tree
		 * @param node
		 * @param pre
		 */
		const loop = (node: TreeNode, pre: preInterface =
			{
				opacity: 1,
				composite: 'source-over',
				parent: undefined,
			},
		) =>
		{
			const layer = this.layers[node.key];
			pre.opacity = layer.opt.opacity * pre.opacity;

			if (layer.opt.hasOwnProperty('composite'))
			{
				// @ts-ignore pass the global composition down
				pre.composite = layer.opt.selected;
			}

			if (node.children.length) // Nodes with children work as folder and do not get rendered
			{
				pre.parent = layer;
				const children = [...node.children].reverse(); // Make a copy and reverse for bot to top render
				for (const item of children)
				{
					loop(item, pre);
				}
			}
			else
			{

				if (!this._treeChecked.includes(node.key)) // Nodes which are not checked do not get rendered
				{
					return;
				}

				drawSingle(layer, pre);
			}
		};

		const temp = [...this._tree]; // Make a copy and reverse for bot to top render
		temp.reverse();
		// Start looping down the tree
		for (const item of temp)
		{
			loop(item);
		}
	}

}