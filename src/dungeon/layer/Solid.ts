import {Layer} from './Layer';

export class SolidLayer extends Layer
{

	public async render()
	{
		this.context.clearRect(0, 0, this.dungeon.totalWidth, this.dungeon.totalHeight);

		this.context.fillStyle = "#c84499"
		this.context.rect(0,0, this.dungeon.totalWidth, this.dungeon.totalHeight);
		this.context.fill();

		super.render();
	}
}