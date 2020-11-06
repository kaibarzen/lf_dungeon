import {SpriteInterface} from './SpriteLoader';

export class Sprite
{
	get offsetY(): number
	{
		return this._offsetY;
	}
	get offsetX(): number
	{
		return this._offsetX;
	}
	get height(): number
	{
		return this._height;
	}
	get width(): number
	{
		return this._width;
	}
	get image(): HTMLImageElement | null
	{
		return this._image;
	}
	get src(): string
	{
		return this._src;
	}

	private readonly id: string;
	private readonly display: string;
	private readonly _src: string;
	private _width: number;
	private _height: number;
	private _offsetX: number;
	private _offsetY: number;
	private _image: HTMLImageElement | null = null;

	constructor({id, display, src, width = 1, height = 1, offsetX = 0, offsetY = 0}: SpriteInterface)
	{
		this.id = id;
		this.display = display;
		this._src = src;
		this._width = width;
		this._height = height;
		this._offsetX = offsetX;
		this._offsetY = offsetY;

		this.load()
	}

	/**
	 * Load the sprite as HTMLimage to be used later
	 */
	async load()
	{
		const that = this; // bind just did not work?

		let node = new Image();
		node.src = this.src;
		node.onload = function ()
		{
			that._image = node;
		}
	}
}