import {ExportData, Layer, options} from './Layer';
import {Sprite} from '../Sprite';
import {toJS} from 'mobx';
import {Layers} from '../Dungeon';

export interface tileOptions extends options
{
	tile: boolean,
}

export class TileLayer extends Layer
{
	public type: Layers = Layers.TILE;
	private data: { [key: number]: { [key: number]: Sprite } } = {}; // y then x

	public opt: tileOptions = {
		name: 'Tile Layer',
		opacity: 1.0,
		tile: true,
	};

	/**
	 * Fill from an specific point out
	 * @param cords
	 * @param sprite
	 */
	public setFill(cords: { x: number, y: number }, sprite: Sprite)
	{
		this.fill(cords.x, cords.y, this.getTarget(cords), sprite);
		this.render();
	}

	/**
	 * Fill remove everything from an specific point out
	 * @param cords
	 */
	public removeFill(cords: { x: number, y: number })
	{
		this.fill(cords.x, cords.y, this.getTarget(cords), undefined);
		this.render();
	}

	/**
	 * Returns taget cords Sprite or undefined on non existence
	 * @param cords
	 */
	private getTarget(cords: { x: number, y: number })
	{
		if (!this.data[cords.y])
		{
			return undefined;
		}
		return this.data[cords.y][cords.x];
	}

	/**
	 * Internal function to fill
	 * @param x
	 * @param y
	 * @param replace
	 * @param place
	 */
	private fill(x: number, y: number, replace: Sprite | undefined, place: Sprite | undefined)
	{
		if (x > this.dungeon.width || x < 0 || y > this.dungeon.height || y < 0) // Out of bounds
		{
			return;
		}

		const target = this.getTarget({x, y});

		if (target === place) // cant replace itself
		{
			return;
		}

		if (target !== replace) // wrong target
		{
			return;
		}

		if (place)
		{ // Place Data
			if (!this.data[y])
			{
				this.data[y] = {};
			}
			this.data[y][x] = place;
		}
		else
		{
			delete this.data[y][x]; // Remove Data
		}

		if (y % 2 === 0)
		{
			this.fill(x + 1, y + 1, replace, place);
			this.fill(x + 1, y - 1, replace, place); //
		}
		else
		{
			this.fill(x - 1, y - 1, replace, place);
			this.fill(x - 1, y + 1, replace, place); //
		}
		this.fill(x, y + 1, replace, place);
		this.fill(x, y - 1, replace, place);
	}

	/**
	 * Set a sprite on given cords, safety check included
	 * @param cords
	 * @param sprite
	 */
	public setTile(cords: { x: number, y: number }, sprite: Sprite)
	{
		if (!this.data[cords.y])
		{
			this.data[cords.y] = {};
		}
		this.data[cords.y][cords.x] = sprite;
		this.render();
	}

	/**
	 * remove a sprite from cords
	 * @param cords
	 */
	public removeTile(cords: { x: number, y: number })
	{
		if (this.data[cords.y])
		{
			delete this.data[cords.y][cords.x];
		}
		this.render();
	}

	async render(): Promise<void>
	{
		this.context.clearRect(0, 0, this.dungeon.totalWidth, this.dungeon.totalHeight);

		for (const y in this.data)
		{
			for (const x in this.data[y])
			{
				const sprite: Sprite = this.data[y][x];
				// @ts-ignore
				const cords = this.generateTileCords(x, y); // Generate canvas tile cords in p

				const xDraw = cords.x + Math.floor(sprite.offsetX * this.dungeon.cellWidth);
				const yDraw = cords.y + Math.floor(sprite.offsetY * this.dungeon.cellHeight);

				const width = this.dungeon.cellWidth * sprite.width;
				const height = this.dungeon.cellHeight * sprite.height;

				if (sprite.image)
				{
					this.context.drawImage(sprite.image, xDraw, yDraw, width, height);
				}
			}
		}

		super.render();
	}

	/**
	 * Import function for tiles, replaces the sprite id with the sprite class
	 * @param data
	 */
	public import(data: TileExportData)
	{
		// @ts-ignore
		this.opt = data.opt;
		this._id = data.id;
		this.type = data.type;

		for (const y in data.data)
		{
			for (const x in data.data[y])
			{
				// @ts-ignore
				const spriteId: string = data.data[y][x];
				const sprite = this.dungeon.sprite.getSprite(spriteId);

				// @ts-ignore
				this.setTile({x, y}, sprite);
			}
		}

	}

	/**
	 * Export data for longtime storage, just replace the Sprite class with the sprite id and export as normal
	 */
	public export(): TileExportData
	{
		let data: { [key: number]: { [key: number]: string } } = {};

		for (const y in this.data)
		{
			if (!data[y])
			{
				data[y] = {};
			}

			for (const x in this.data[y])
			{
				const sprite: Sprite = this.data[y][x];
				data[y][x] = sprite.id;
			}
		}

		return {
			id: this._id,
			type: this.type,
			opt: toJS(this.opt),
			data,
		};
	}

}

export interface TileExportData extends ExportData
{
	data: { [key: number]: { [key: number]: string } }
}
