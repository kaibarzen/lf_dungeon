import {input, Layer, optionConstructorItem, options} from './Layer';
import {folderOptions} from './Folder';
import { toJS } from 'mobx';

export interface solidOptions extends options
{
	color: string,
}

export class SolidLayer extends Layer
{
	public opt: solidOptions = {
		name: 'Solid Layer ',
		opacity: 1.0,
		color: '#000000',
	};

	public getOptions(): optionConstructorItem[]
	{
		return [
			{
				type: input.NAME,
				key: 'name',
				value: this.opt.name,
			},
			{
				title: "Color",
				type: input.COLOR,
				key: 'color',
				value: this.opt.color,
			},
		];
	}

	public async render()
	{
		this.context.clearRect(0, 0, this.dungeon.totalWidth, this.dungeon.totalHeight);

		this.context.fillStyle = this.opt.color;
		this.context.rect(0, 0, this.dungeon.totalWidth, this.dungeon.totalHeight);
		this.context.fill();

		super.render();
	}
}