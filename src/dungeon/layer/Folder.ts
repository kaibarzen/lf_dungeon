import {constructorParams, constructorRequired, Layer, options} from './Layer';

export interface folderOptions extends options
{
	name: string,
	opacity: number,
	folder: boolean,
}

export class FolderLayer extends Layer
{
	// I didn't figured out how to check which specific sunclass we are currently using so i just set the folder opt which gets consumed in the frontend
	public opt: folderOptions = {
		name: 'New Folder Layer ',
		opacity: 1.0,
		folder: true,
	};

}