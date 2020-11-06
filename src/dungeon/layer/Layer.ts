import {Dungeon, Layers} from '../Dungeon';
import {action, makeObservable, observable, toJS} from 'mobx';

export interface Cords
{
	x: number,
	y: number,
}

/**
 * Layer option types for frontend generation
 */
export enum input
{
	STRING,
	NUMBER,
	DOUBLE,
	IMAGE,
	PERCENT,
	CHECKBOX,
	NAME,
	COLOR,
	SELECT,
	SWITCH,
}

export interface optionConstructorItem
{
	title?: string,
	desc?: string,
	type: input,
	key: string,
	value?: any,
	data?: object, // optional Data like min-max range and so on
}

export interface options
{
	name: string,
	opacity: number,
}

export interface constructorRequired
{
	dungeon: Dungeon,
	id: number,
}

export abstract class Layer
{
	get id(): number
	{
		return this._id;
	}

	get name(): string
	{
		return this.opt.name;
	}

	protected _id: number;
	public type: Layers = Layers.LAYER;
	protected dungeon: Dungeon;
	protected context: CanvasRenderingContext2D; // Main Context

	public opt: options = {
		name: 'New Layer ',
		opacity: 1.0,
	};

	constructor(
		req: constructorRequired,
		opt: options | undefined,
	)
	{
		makeObservable(this, {
			setOptions: action,
			opt: observable,
		});
		this.dungeon = req.dungeon;
		this._id = req.id;
		this.opt = {...this.opt, ...opt};

		this.context = this.generateContext();
	}

	/**
	 * Get the option constructur incl value
	 */
	public getOptions(): optionConstructorItem[]
	{
		return [
			{
				type: input.NAME,
				key: 'name',
				value: this.opt.name,
			},
			{
				title: 'Opacity',
				type: input.PERCENT,
				key: 'opacity',
				value: this.opt.opacity,
			},
		];
	}

	/**
	 * Set options via object destruction, calls render
	 * @param options
	 */
	public setOptions(options: options)
	{
		this.opt = {...this.opt, ...options};
		if (options.name !== undefined)
		{
			this.dungeon.renameTree(this._id, this.opt.name);
		}
		this.render();
	}

	/**
	 * Generate an already resized context
	 */
	protected generateContext(): CanvasRenderingContext2D
	{
		let canvas = document.createElement('canvas');
		canvas.width = this.dungeon.totalWidth;
		canvas.height = this.dungeon.totalHeight;
		const context = canvas.getContext('2d');
		if (context === null)
		{
			throw new Error('Could not create 2d context of HTML Canvas');
		}
		return context;
	}

	/**
	 * Calculates the upper right px for a tile
	 * @param x
	 * @param y
	 */
	protected generateTileCords(x: number, y: number): Cords
	{
		const {cellWidth, cellHeight} = this.dungeon;
		if (y % 2 === 0)
		{
			return {
				x: x * cellWidth,
				y: Math.floor(y * 0.5) * cellHeight - Math.floor(cellHeight * 0.5),
			};
		}
		return {
			x: x * cellWidth - Math.floor(cellWidth * 0.5),
			y: Math.floor(y * 0.5) * cellHeight,
		};
	}

	/**
	 * Generates a 2d Path for the given tile cords
	 * @param x
	 * @param y
	 * @param grow
	 */
	protected generateTileRegion(x: number, y: number, {grow = 0} = {}): Path2D
	{

		const {cellWidth, cellHeight} = this.dungeon;

		const cords = this.generateTileCords(x, y);

		let region = new Path2D();
		region.moveTo(cords.x + Math.floor(cellWidth * 0.5), cords.y - grow);
		region.lineTo(cords.x + cellWidth + grow, cords.y + Math.floor(cellHeight * 0.5));
		region.lineTo(cords.x + Math.floor(cellWidth * 0.5), cords.y + cellHeight + grow);
		region.lineTo(cords.x - grow, cords.y + Math.floor(cellHeight * 0.5));
		region.closePath();

		return region;
	}

	/**
	 * Called on resize, resized the canvas and calls render()
	 */
	public async resize(): Promise<void>
	{
		this.context.canvas.width = this.dungeon.totalWidth;
		this.context.canvas.height = this.dungeon.totalHeight;
		await this.render();
	}

	/**
	 * Overrided by subclass, renders async
	 */
	public async render(): Promise<void>
	{
		// Render our canvas and notify our mainclass that we made changes.
		// Render will be automatically called after everything got initialized in the mainclass
		// (so do not call this from the constructor)
		this.dungeon.renderLayer();
	}

	/**
	 * Return a canvas to merge, does not rerender any changes
	 */
	public getRender(): HTMLCanvasElement
	{
		return this.context.canvas;
	}

	/**
	 * Import function
	 * @param data
	 */
	public import(data: ExportData)
	{
		// @ts-ignore
		this.opt = data.opt;
		this._id = data.id;
		this.type = data.type;
	}

	/**
	 * Export data for longtime storage
	 */
	public export(): ExportData
	{
		return {
			id: this._id,
			type: this.type,
			opt: toJS(this.opt),
		};
	}
}

export interface ExportData
{
	id: number,
	type: Layers,
	opt: any
}