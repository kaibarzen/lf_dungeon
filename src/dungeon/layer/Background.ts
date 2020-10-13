import {input, Layer, optionConstructorItem, options} from './Layer';
import store from '../store';

export interface backgroundOptions extends options
{
	repeat: boolean,
	image: string | null,
}

export class BackgroundLayer extends Layer
{
	public opt: backgroundOptions = {
		name: 'Background Layer',
		opacity: 1.0,
		repeat: false,
		image: null,
	};

	public getOptions(): optionConstructorItem[]
	{
		return [...super.getOptions(),
			{
				title: 'Repeat',
				type: input.SWITCH,
				key: 'repeat',
				value: this.opt.repeat,
			},
			{
				title: 'Image',
				type: input.IMAGE,
				key: 'image',
				value: this.opt.image,
			},
		];
	}

	async render(): Promise<void>
	{
		this.context.clearRect(0, 0, this.dungeon.totalWidth, this.dungeon.totalHeight);

		if (!this.opt.image)
		{
			return super.render();
		}

		const img = new Image();
		img.onload = () =>
		{
			if (this.opt.repeat)
			{
				const pattern = this.context.createPattern(img, 'repeat');
				if(pattern){
					this.context.fillStyle = pattern;
					this.context.fillRect(0, 0, this.dungeon.totalWidth, this.dungeon.totalHeight);
				}
				return super.render();
			}

			this.context.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.dungeon.totalWidth, this.dungeon.totalHeight);
			return super.render();
		};

		store.imageLibrary.getImage(this.opt.image).then((value) =>
		{
			if (!value)
			{
				return super.render();
			}
			img.src = value;
		});
	}
}