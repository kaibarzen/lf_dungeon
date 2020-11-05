import {slice} from './sprites/moon';

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

	constructor()
	{
		this.registerSlice(slice);
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

	/**
	 * Calls registerSprite with an foreach loop
	 * @param sprites
	 */
	public registerSprites(sprites: SpriteInterface[])
	{
		for (const key in sprites)
		{
			this.registerSprite(sprites[key]);
		}
	}

	public registerSprite(sprite: SpriteInterface)
	{
		console.log(sprite);
	}

}