import {SpriteInterface} from './SpriteLoader';

export class Sprite
{
	get src(): string
	{
		return this._src;
	}

	private readonly id: string;
	private readonly display: string;
	private readonly _src: string;
	private readonly width: number;
	private readonly height: number;
	private readonly offsetX: number;
	private readonly offsetY: number;

	constructor({id, display, src, width = 1, height = 1, offsetX = 0, offsetY = 0}: SpriteInterface)
	{
		this.id = id;
		this.display = display;
		this._src = src;
		this.width = width;
		this.height = height;
		this.offsetX = offsetX;
		this.offsetY = offsetY;
	}
}