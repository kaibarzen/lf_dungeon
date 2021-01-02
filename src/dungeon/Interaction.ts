import {Dungeon} from './Dungeon';
import {Cords} from './layer/Layer';
import {Tool} from './Editor';
import {Sprite} from './Sprite';

export interface conParams
{

}

export interface conRequired
{
	dungeon: Dungeon;
}

export enum MouseStatus
{
	PRIMARY,
	SECONDARY,
	MIDDLE,
	UNPRESSED,
}

enum InteractionType
{
	CLICK,
	DRAW
}

/**
 * Class to manage the direct interaction with the canvas
 */
export class Interaction
{
	get context(): CanvasRenderingContext2D
	{
		return this._context;
	}

	private readonly dungeon: Dungeon;
	private hitContext: CanvasRenderingContext2D;

	private highlight: { x: number, y: number } = {x: -1, y: -1};
	private mouseStatus: MouseStatus = MouseStatus.UNPRESSED;
	private eventCanvas: HTMLCanvasElement | undefined;
	private _context: CanvasRenderingContext2D;

	constructor(req: conRequired, params: conParams | undefined)
	{
		this.dungeon = req.dungeon;
		this.hitContext = this.generateContext();
		this._context = this.generateContext();
	}

	/**
	 * Disable the context menu on the canvas
	 * @param e
	 */
	private oncontextmenu(e: MouseEvent)
	{
		e.preventDefault();
		return false;
	}

	private onmousemove(e: MouseEvent)
	{
		const cords = this.getCords(e);
		if (cords.x !== this.highlight.x || cords.y !== this.highlight.y)
		{
			this.highlight = cords;
			this.renderHighlight();
			this.tileInteraction(InteractionType.DRAW);
		}
	}

	private onmouseleave(e: MouseEvent)
	{
		this.highlight = {x: -1, y: -1};
		this.renderHighlight();
	}

	/**
	 * Bound on the document body
	 * @param e
	 */
	private onmousedown(e: MouseEvent)
	{
		switch (e.button)
		{
			case 0:
				this.mouseStatus = MouseStatus.PRIMARY;
				break;
			case 1:
				this.mouseStatus = MouseStatus.MIDDLE;
				break;
			case 2:
				this.mouseStatus = MouseStatus.SECONDARY;
				break;
			default:
				return;
		}
		this.tileInteraction(InteractionType.CLICK);

		// @ts-ignore
		if (e.target?.nodeName === 'IMG')
		{
			e.preventDefault(); // To Stop drop n drag of images
		}
	}

	/**
	 * Bound on the document body
	 * @param e
	 */
	private onmouseup(e: MouseEvent)
	{
		this.mouseStatus = MouseStatus.UNPRESSED;
	}

	/**
	 * Decides if to place / remove a tile on a tile layer
	 */
	private tileInteraction(type: InteractionType)
	{
		if (!this.dungeon.lastSelectedTileLayer || this.mouseStatus === MouseStatus.UNPRESSED)
		{
			return;
		}

		const selectedLayerId: string | null = this.dungeon.editor.selectedTile;
		const sprite: Sprite | undefined = this.dungeon.sprite.getSprite(selectedLayerId || '');

		if (!selectedLayerId)
		{
			return;
		}

		switch (this.dungeon.editor.selectedTool)
		{
			case Tool.PLACE:

				if (this.mouseStatus === MouseStatus.SECONDARY) // Secondary mouse button, delete
				{
					this.dungeon.lastSelectedTileLayer.removeTile(this.highlight);
					return;
				}

				if (!sprite) // No Sprite Selected
				{
					return;
				}
				this.dungeon.lastSelectedTileLayer.setTile(this.highlight, sprite);
				return;

			case Tool.FILL:

				if (type === InteractionType.DRAW)
				{
					return;
				}

				if (this.mouseStatus === MouseStatus.SECONDARY) // delete
				{
					this.dungeon.lastSelectedTileLayer.removeFill(this.highlight);
					return;
				}

				if (!sprite) // No Sprite Selected
				{
					return;
				}
				this.dungeon.lastSelectedTileLayer.setFill(this.highlight, sprite);
				return;

			default:
				return;
		}

	}

	private renderHighlight()
	{
		this.context.clearRect(0, 0, this.dungeon.totalWidth, this.dungeon.totalHeight);
		this.context.fillStyle = 'rgba(255,0,255, 0.7)';
		this.context.fill(this.generateTileRegion(this.highlight.x, this.highlight.y));
		this.dungeon.render();
	}

	/**
	 * Get tile cords from mouseEvent
	 * @param e
	 */
	private getCords(e: MouseEvent)
	{
		if (!this.eventCanvas)
		{
			throw new Error('Somehow the non existing canvas fired an mouse event?');
		}
		const rect = this.eventCanvas.getBoundingClientRect();
		const x = Math.round(e.clientX - rect.left);
		const y = Math.round(e.clientY - rect.top);
		const color = this.hitContext.getImageData(x, y, 1, 1).data;
		const cords = this.colorToCords(color);
		if (!cords)
		{ // If Unsure return "old" but safe cords
			return this.highlight;
		}
		return cords;
	}

	/**
	 * Set the currently used canvas for mouse events
	 * @param canvas
	 */
	public bindEvents(canvas: HTMLCanvasElement)
	{
		canvas.onmousemove = this.onmousemove.bind(this);
		canvas.onmouseleave = this.onmouseleave.bind(this);
		canvas.oncontextmenu = this.oncontextmenu.bind(this);
		document.body.onmousedown = this.onmousedown.bind(this);
		document.body.onmouseup = this.onmouseup.bind(this);
		this.eventCanvas = canvas;
	}

	/**
	 * call on a canvas resize, the hit canvas gets rerendered
	 */
	public resize()
	{
		if (!this.eventCanvas)
		{
			return;
		}

		this.hitContext.canvas.width = this.dungeon.totalWidth;
		this.hitContext.canvas.height = this.dungeon.totalHeight;
		this.context.canvas.width = this.dungeon.totalWidth;
		this.context.canvas.height = this.dungeon.totalHeight;
		this.generateHitContext();
	}

	/**
	 * generate an hit canvas
	 */
	private generateHitContext()
	{
		this.hitContext.clearRect(0, 0, this.dungeon.totalWidth, this.dungeon.totalHeight);

		// Always to +1 to get tiles at the edges
		for (let y = 0; y < this.dungeon.height + 1; y++)
		{
			for (let x = 0; x < this.dungeon.width + 1; x++)
			{
				this.hitContext.fillStyle = this.cordsToColor(x, y);
				this.hitContext.fill(this.generateTileRegion(x, y, {grow: -1}));
			}
		}
	}

	/**
	 * Calculates tile x y cords to a color
	 * @param x
	 * @param y
	 * @returns {string}
	 */
	private cordsToColor(x: number, y: number)
	{
		if (x > 255 || y > 255)
		{
			throw new Error('Width/Height Exceeds 255');
		}

		if (x < 0 || y < 0)
		{
			throw new Error('Width/Height Must be larger then -1');
		}

		return `rgba(${x}, ${y}, 0, 255)`;
	}

	/**
	 * Transform context.getImageData array to cords
	 * Either returns cords object or false
	 * @param color
	 */
	private colorToCords(color: Uint8ClampedArray)
	{
		if (color[3] === 255)
		{
			return {
				x: color[0],
				y: color[1],
			};
		}
		return false;
	}

	/**
	 * Generate an already resized context
	 */
	private generateContext(): CanvasRenderingContext2D
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
	private generateTileCords(x: number, y: number): Cords
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
	private generateTileRegion(x: number, y: number, {grow = 0} = {}): Path2D
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

}