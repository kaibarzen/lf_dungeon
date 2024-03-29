import {Layer} from './layer/Layer';
import {DevLayer} from './layer/Dev';
import {makeAutoObservable, toJS} from 'mobx';
import {SolidLayer} from './layer/Solid';
import {FolderLayer} from './layer/Folder';
import {GridLayer} from './layer/Grid';
import {CompositeLayer} from './layer/Composite';
import {BackgroundLayer} from './layer/Background';
import {Interaction} from './Interaction';
import {Editor} from './Editor';
import {SpriteLoader} from './SpriteLoader';
import {TileLayer} from './layer/Tile';
import {ExportDungeon, IOManager} from './IOManager';

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
	LAYER = 'LAYER', // Not Possible
	BACKGROUND = 'BACKGROUND',
	COMPOSITE = 'COMPOSITE',
	DEV = 'DEV',
	FOLDER = 'FOLDER',
	GRID = 'GRID',
	TILE = 'TILE',
	SOLID = 'SOLID',
}

export interface TreeNode
{
	title: string,
	key: number,
	children: TreeNode[]
}

export class Dungeon
{
	get layers(): { [p: number]: Layer }
	{
		return this._layers;
	}

	get lastSelectedTileLayer(): TileLayer | undefined
	{
		return this._lastSelectedTileLayer;
	}

	get treeChecked(): number[]
	{
		return this._treeChecked;
	}

	// Calls render
	set treeChecked(value: number[])
	{
		this._treeChecked = value;
		this.renderLayer();
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
		this.renderLayer();
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
	private renderContext: CanvasRenderingContext2D = this.generateContext();

	public interaction: Interaction = new Interaction({dungeon: this}, undefined);
	public editor: Editor = new Editor({dungeon: this}, undefined);
	public sprite: SpriteLoader = new SpriteLoader();
	public iom: IOManager = new IOManager({dungeon: this});

	private _layers: { [key: number]: Layer } = {};
	private _tree: TreeNode[] = [];
	private _treeChecked: number[] = [];
	private _selectedLayer: Layer | undefined;
	private _lastSelectedTileLayer: TileLayer | undefined;

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
		this.interaction.bindEvents(context.canvas);
		this.resize();
	}

	/**
	 * Generate an already resized context
	 */
	private generateContext(): CanvasRenderingContext2D
	{
		let canvas = document.createElement('canvas');
		canvas.width = this.totalWidth;
		canvas.height = this.totalHeight;
		const context = canvas.getContext('2d');
		if (context === null)
		{
			throw new Error('Could not create 2d context of HTML Canvas');
		}
		return context;
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
	 * Return als size variables in one object
	 */
	public getSize()
	{
		return {
			width: this._width,
			height: this._height,
			cellWidth: this._cellWidth,
			cellHeight: this._cellHeight,
		};
	}

	/**
	 * Resize all, force layers to resize/rerender, also rezized Interaction.ts
	 */
	private resize(): void
	{
		if (!this.context)
		{
			return;
		}
		this.context.canvas.width = this._totalWidth;
		this.context.canvas.height = this._totalHeight;
		this.renderContext.canvas.width = this._totalWidth;
		this.renderContext.canvas.height = this._totalHeight;

		for (const [, layer] of Object.entries(this._layers))
		{
			layer.resize();
		}
		this.interaction.resize();
	}

	/**
	 * Transforms the layer id into the layer class and sets it as the currently selected layer
	 * @param value
	 */
	public setSelectedLayer(value: number)
	{
		const newLayer = this._layers[value];
		this._selectedLayer = newLayer;

		// I don't trust ts on that
		if (newLayer instanceof TileLayer && 'tile' in newLayer.opt)
		{
			this._lastSelectedTileLayer = newLayer;
		}

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
				newLayer = TileLayer;
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
		this._layers[this.idCounter] = newLayer;

		this._tree.push({
			title: newLayer.name,
			children: [],
			key: this.idCounter,
		});
		this._treeChecked.push(this.idCounter);

		newLayer.render();

		this.setSelectedLayer(this.idCounter); // set the layer as selected for quality of life
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

		let removeIds: number[] = []; // List of ids to be removed

		const loop = (children: TreeNode[], remove = false) =>
		{

			for (let i = 0; i < children.length; i++)
			{
				const node = children[i];
				if (node.key === id) // Exactly the deleted layer
				{
					loop(node.children, true);
					children.splice(i, 1);
					removeIds.push(node.key);
					return;
				}
				if (remove) // Child of deleted layer
				{
					removeIds.push(node.key);
					loop(node.children, true);
				}
				else // Not a child of the deleted layer/not the deleted layer
				{
					loop(node.children);
				}
			}
		};

		loop(this._tree);

		for (const id of removeIds)
		{
			// Remove deleted ids out of is checked array
			const index = this._treeChecked.indexOf(id);
			if (index !== -1)
			{
				this._treeChecked.splice(index, 1);
			}

			// Delete layer obj
			delete this._layers[id];
		}


		//Unset selected layers
		if (this._selectedLayer?.id === id)
		{
			this._selectedLayer = undefined;
		}
		if (this._lastSelectedTileLayer?.id === id)
		{
			this._lastSelectedTileLayer = undefined;
		}
		this.renderLayer();
	}

	/**
	 * Returns Layer by key/id, returns false of id does not exists
	 * @param id
	 */
	getLayer(id: number): Layer | false
	{
		const layer = this._layers[id];
		if (layer)
		{
			return layer;
		}
		return false;
	}

	/**
	 * Renders the layers hierarchy, gets called by the layers itself on changes
	 */
	renderLayer()
	{
		// First Layer of a composite has to be source-over, so this is a checklist
		let compositePlaced: number[] = [];

		/**
		 * Function that draw's the layer to the canvas.
		 * @param layer
		 * @param opacity, calculated opacity through the tree
		 */
		const drawSingle = (layer: Layer, parent: Layer, folderContext: CanvasRenderingContext2D, overrideContext: CanvasRenderingContext2D | null) =>
		{
			folderContext.globalAlpha = layer.opt.opacity;

			// @ts-ignore
			if (parent.opt.composite)
			{
				if (compositePlaced.includes(parent.id))
				{
					// @ts-ignore
					folderContext.globalCompositeOperation = parent.opt.selected;
				}
				else
				{
					compositePlaced.push(parent.id);
				}
			}

			if (overrideContext)
			{
				folderContext.drawImage(overrideContext.canvas, 0, 0);
			}
			else
			{
				folderContext.drawImage(layer.getRender(), 0, 0);
			}
		};

		/**
		 * Function to recursively loop to the tree
		 * @param node
		 * @param pre
		 */
		const loop = (node: TreeNode, parent: Layer, higherContext: CanvasRenderingContext2D) =>
		{
			const layer = this._layers[node.key]; // Current Layer/Folder

			if (node.children.length) // Folder
			{
				const context = this.generateContext(); // Emulate Layer context
				for (const item of [...node.children].reverse())
				{
					loop(item, layer, context); //
				}
				drawSingle(layer, parent, higherContext, context);
			}
			else
			{

				if (!this._treeChecked.includes(node.key)) // Layer
				{
					return false;
				}

				drawSingle(layer, parent, higherContext, null);
			}
		};

		this.renderContext.clearRect(0, 0, this._totalWidth, this._totalHeight); // Clear canvas
		this._layers[-1] = new FolderLayer({dungeon: this, id: -1}, undefined); // Fake folder layer

		const source = {
			title: 'Final Render Layer',
			key: -1,
			children: this._tree,
		};

		loop(source, this._layers[-1], this.renderContext);
		this.render();
	}

	/**
	 * Render the final class, gets called on layer or interactable changes
	 */
	render()
	{
		if (!this.context)
		{
			return;
		}
		this.context.clearRect(0, 0, this._totalWidth, this._totalHeight);
		this.context.drawImage(this.renderContext.canvas, 0, 0);
		this.context.drawImage(this.interaction.context.canvas, 0, 0);
	}

	/**
	 * User Download for the canvas as png image
	 */
	public download()
	{
		const img = this.renderContext.canvas.toDataURL('image/png');
		let link = document.createElement('a');
		link.download = 'Dungeon.png';
		link.href = img;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	/**
	 * Returns rendercanvas as dataurl
	 */
	public getDataUrl(): string
	{
		return this.renderContext.canvas.toDataURL('image/png');
	}

	public import(data: ExportDungeon)
	{
		this._width = data.width;
		this._height = data.height;
		this._cellWidth = data.cellWidth;
		this._cellHeight = data.cellHeight;
		this._totalWidth = data.totalWidth;
		this._totalHeight = data.totalHeight;
		this.idCounter = data.idCounter;
		this._tree = data.tree;
		this._treeChecked = data.treeChecked;
	}

	public importLayer(id: number, layer: Layer)
	{
		this._layers[id] = layer;
	}

	public export(): ExportDungeon
	{
		return {
			width: this._width,
			height: this._height,
			cellWidth: this._cellWidth,
			cellHeight: this._cellHeight,
			totalWidth: this._totalWidth,
			totalHeight: this._totalHeight,
			idCounter: this.idCounter,
			tree: toJS(this._tree),
			treeChecked: toJS(this._treeChecked),
		};
	}

}