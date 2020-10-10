import {Dungeon} from '../Dungeon';
import {action, computed, makeObservable, observable} from 'mobx';

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
}

export interface optionConstructorItem
{
	title?: string,
	desc?: string,
	type: input,
	key: string,
	value?: any,
}

export interface options
{
	name: string,
	opacity: number,
}

export interface constructorParams
{
	name?: string,
	opacity?: number,
	enabled?: boolean,
}

export interface constructorRequired
{
	dungeon: Dungeon,
	id: number,
}

export abstract class Layer
{
	get name(): string
	{
		return this.opt.name;
	}

	// Todo blending mode
	protected dungeon: Dungeon; // Dungeon ref, mainly used for sizes
	private id: number;
	protected data: any; // TODO Data Class
	protected context: CanvasRenderingContext2D; // Main Context

	// All Params/Options, has to be public because of mobx,
	public opt: options = {
		name: 'Unnamed',
		opacity: 1.0,
	};

	constructor(
		req: constructorRequired,
		opt: constructorParams,
	)
	{
		makeObservable(this, {
			setOptions: action,
			opt: observable,
		});
		this.dungeon = req.dungeon;
		this.id = req.id;
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
		];
	}

	/**
	 * Set options via object destruction
	 * @param options
	 */
	public setOptions(options: options)
	{
		this.opt = {...this.opt, ...options};
		if(options.name !== undefined){
			this.dungeon.renameTree(this.id, this.opt.name)
		}
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
		this.dungeon.render();
	}

	/**
	 * Return a canvas to merge, does not rerender any changes
	 */
	public getRender(): HTMLCanvasElement
	{
		return this.context.canvas;
	}

	/**
	 * Export data for longtime storage
	 */
	public export()
	{

	}

}