import {Layer, options} from './Layer';
import {Layers} from '../Dungeon';

export interface folderOptions extends options
{
	folder: boolean,
}

export class FolderLayer extends Layer
{
	public type: Layers = Layers.FOLDER;

	public opt: folderOptions = {
		name: 'Folder ',
		opacity: 1.0,
		folder: true,
	};

}