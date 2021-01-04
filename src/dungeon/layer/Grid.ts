import {Cords, input, Layer, optionConstructorItem, options} from './Layer';
import {Layers} from '../Dungeon';

export interface gridOptions extends options
{
	color: string,
	lineWidth: number,
	scaling: number,
	offsetX: number,
	offsetY: number,
}

export class GridLayer extends Layer
{
	public type: Layers = Layers.GRID;

	public opt: gridOptions = {
		name: 'Grid Layer ',
		opacity: 1.0,
		color: '#ffffff',
		lineWidth: 1,
		offsetX: 0,
		offsetY: 0,
		scaling: 1,
	};

	public getOptions(): optionConstructorItem[]
	{
		return [...super.getOptions(),
			{
				title: 'Line Width',
				type: input.NUMBER,
				key: 'lineWidth',
				value: this.opt.lineWidth,
			},
			{
				title: 'Color',
				type: input.COLOR,
				key: 'color',
				value: this.opt.color,
			},
			{
				title: 'Grid Scaling',
				type: input.NUMBER,
				key: 'scaling',
				value: this.opt.scaling,
			},
			{
				title: 'Grid Offset X',
				type: input.NUMBER,
				key: 'offsetX',
				value: this.opt.offsetX,
			},
			{
				title: 'Grid Offset Y',
				type: input.NUMBER,
				key: 'offsetY',
				value: this.opt.offsetY,
			},
		];
	}

	public async render()
	{
		this.context.clearRect(0, 0, this.dungeon.totalWidth, this.dungeon.totalHeight);

		this.context.strokeStyle = this.opt.color;
		this.context.lineWidth = this.opt.lineWidth;

		console.log(this.opt.scaling)
		if (this.opt.scaling === 0)
		{
			return;
		}

		for (let y = -8; y < this.dungeon.height / this.opt.scaling + 8; y++)
		{
			for (let x = -8; x < this.dungeon.width / this.opt.scaling + 8; x++)
			{
				this.context.stroke(this.generateTileRegion(x, y));
			}
		}

		super.render();
	}

	/**
	 * Generates a 2d Path for the given tile cords
	 * @param x
	 * @param y
	 * @param grow
	 */
	protected generateTileRegion(x: number, y: number, {grow = 0} = {}): Path2D
	{

		const cellWidth = this.dungeon.cellWidth * this.opt.scaling;
		const cellHeight = this.dungeon.cellHeight * this.opt.scaling;

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
	 * Calculates the upper right px for a tile
	 * @param x
	 * @param y
	 */
	protected generateTileCords(x: number, y: number): Cords
	{
		const cellWidth = this.dungeon.cellWidth * this.opt.scaling;
		const cellHeight = this.dungeon.cellHeight * this.opt.scaling;

		if (y % 2 === 0)
		{
			return {
				x: x * cellWidth + this.dungeon.cellWidth * this.opt.offsetX,
				y: Math.floor(y * 0.5) * cellHeight - Math.floor(cellHeight * 0.5) + this.dungeon.cellHeight * this.opt.offsetY,
			};
		}
		return {
			x: x * cellWidth - Math.floor(cellWidth * 0.5) + this.dungeon.cellWidth * this.opt.offsetX,
			y: Math.floor(y * 0.5) * cellHeight + this.dungeon.cellHeight * this.opt.offsetY,
		};
	}
}