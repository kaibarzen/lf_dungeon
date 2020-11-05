import {register} from './sprites/all';
import {Sprite} from './Sprite';

export interface Slice
{
	id: string,
	display: string,
	desc: string,
	sprites: object,
	groups: object[],
}

export interface SpriteInterface
{
	id: string,
	display: string,
	src: string,
	width?: number,
	height?: number,
	offsetX?: number,
	offsetY?: number,
}

export class SpriteLoader
{

	private sprites: { [key: string]: Sprite } = {};

	constructor()
	{
		for (const slice of register)
		{
			this.registerSlice(slice);
		}
	}

	public registerSlice(slice: Slice)
	{
		for (const key in slice.sprites)
		{
			// @ts-ignore
			let sprite = slice.sprites[key];
			sprite.id = [slice.id, key].join('/');
			this.registerSprite(sprite);
		}
	}

	public registerSprite(sprite: SpriteInterface)
	{
		this.sprites[sprite.id] = new Sprite(sprite);
	}

	public getSprite(key: string): Sprite | undefined
	{
		return this.sprites[key];
	}

}