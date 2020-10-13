import {constructorParams, constructorRequired, input, Layer, optionConstructorItem, options} from './Layer';

export interface compositeOptions extends options
{
	folder: boolean,
	composite: boolean,
	selected: string,
}

export class compositeLayer extends Layer
{
	public opt: compositeOptions = {
		name: 'Composite Folder ',
		opacity: 1.0,
		folder: true, // To enable dragging stuff into this layer
		composite: true, // To quickly check that we are a composite layer
		selected: 'source-over',
	};

	public getOptions(): optionConstructorItem[]
	{
		return [...super.getOptions(),
			{
				type: input.SELECT,
				title: 'Folder Composite Operation',
				key: 'selected',
				value: this.opt.selected,
				data: {
					options: [
						{
							value: 'source-over',
						},
						{
							value: 'source-in',
						},
						{
							value: 'destination-in',
						},
						{
							value: 'destination-out',
						},
					],
				},
			}];
	}

}