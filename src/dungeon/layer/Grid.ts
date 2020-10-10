import {input, Layer, optionConstructorItem, options} from './Layer';

export interface gridOptions extends options
{
	color: string,
	lineWidth: number,
}

export class GridLayer extends Layer
{
	public opt: gridOptions = {
		name: 'Grid Layer ',
		opacity: 1.0,
		color: '#ffffff',
		lineWidth: 1,
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
		];
	}

	public async render()
	{
		this.context.clearRect(0, 0, this.dungeon.totalWidth, this.dungeon.totalHeight);

		this.context.strokeStyle = this.opt.color;
		this.context.lineWidth = this.opt.lineWidth;

		// Always to +1 to get tiles at the edges
		for (let y = 0; y < this.dungeon.height + 1; y++)
		{
			for (let x = 0; x < this.dungeon.width + 1; x++)
			{
				this.context.stroke(this.generateTileRegion(x, y));
			}
		}

		super.render();
	}
}