import {constructorParams, constructorRequired, Layer, options} from './Layer';

export interface folderOptions extends options
{
	folder: boolean,
}

export class FolderLayer extends Layer
{
	public opt: folderOptions = {
		name: 'Folder ',
		opacity: 1.0,
		folder: true,
	};

}