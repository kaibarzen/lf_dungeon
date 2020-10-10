import {input, Layer, optionConstructorItem, options} from './Layer';

export interface devOptions extends options
{
	primaryColor: string,
	secondaryColor: string,
}

export class DevLayer extends Layer
{
	public opt: devOptions = {
		name: 'Dev Layer',
		opacity: 1.0,
		primaryColor: '#ff0000',
		secondaryColor: '#0000ff',
	};

	public getOptions(): optionConstructorItem[]
	{
		return [
			{
				type: input.NAME,
				key: "name",
				value: this.opt.name,
			},
			{
				title: "Primary Color",
				type: input.COLOR,
				key: "primaryColor",
				value: this.opt.primaryColor
			},
			{
				title: "Secondary Color",
				type: input.COLOR,
				key: "secondaryColor",
				value: this.opt.secondaryColor
			}
		]
	}

	public async render(): Promise<void>
	{
		this.context.clearRect(0, 0, this.dungeon.totalWidth, this.dungeon.totalHeight);
		for (let y = 0; y < this.dungeon.height + 1; y++)
		{
			for (let x = 0; x < this.dungeon.height + 1; x++)
			{

				const cords = this.generateTileCords(x, y);

				this.context.lineWidth = 1;
				this.context.strokeStyle = y % 2 === 0 ? this.opt.primaryColor : this.opt.secondaryColor;
				this.context.fillStyle = y % 2 === 0 ? this.opt.primaryColor : this.opt.secondaryColor;
				this.context.strokeRect(cords.x, cords.y, this.dungeon.cellWidth, this.dungeon.cellHeight);
				this.context.fillRect(cords.x, cords.y, 8, 8);
				this.context.fillText(`${x} - ${y}`, cords.x, cords.y);
			}
		}
		super.render();
	}
}