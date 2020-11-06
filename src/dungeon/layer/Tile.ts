import {Layer} from './Layer';
import {Sprite} from '../Sprite';
import {Tool} from '../Editor';
import {SpriteLoader} from '../SpriteLoader';

export class TileLayer extends Layer
{
	private data: { [key: number]: { [key: number]: Sprite } } = {}; // y then x

	public opt = {
		name: 'Tile Layer',
		opacity: 1.0,
		tile: true,
	};

	public onmousedown(e: MouseEvent, cords: { x: number, y: number })
	{
		const tool: Tool = this.dungeon.editor.selectedTool;
		const spriteId: string | null = this.dungeon.editor.selectedTile;

		if (tool === Tool.REMOVE)
		{
			this.removeTile(cords);
			this.render()
			return;
		}

		if (!spriteId) // No Sprite Selected
		{
			return;
		}

		const sprite: Sprite | undefined = this.dungeon.sprite.getSprite(spriteId);

		if (!sprite) // Safety check
		{
			return;
		}

		this.setTile(cords, sprite);
		this.render()
	}

	/**
	 * Set a sprite on given cords, safety check included
	 * @param cords
	 * @param sprite
	 */
	private setTile(cords: { x: number, y: number }, sprite: Sprite)
	{
		if (!this.data[cords.y])
		{
			this.data[cords.y] = {};
		}
		this.data[cords.y][cords.x] = sprite;
	}

	/**
	 * remove a sprite from cords
	 * @param cords
	 */
	private removeTile(cords: { x: number, y: number })
	{
		delete this.data[cords.y][cords.x];
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
}