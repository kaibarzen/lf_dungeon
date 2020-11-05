import {Dungeon} from './Dungeon';
import {makeAutoObservable} from 'mobx';

export interface conParams
{

}

export interface conRequired
{
	dungeon: Dungeon;
}

export enum Tool
{
	PLACE,
	REMOVE
}

/**
 * Class to manage ui interactions and selected sprite
 */
export class Editor
{
	set layerModal(value: boolean)
	{
		this._layerModal = value;
	}
	get layerModal(): boolean
	{
		return this._layerModal;
	}

	private _layerModal = false; // Add Layer Modal
	private dungeon: Dungeon;

	constructor(req: conRequired, params: conParams | undefined)
	{
		makeAutoObservable(this);
		this.dungeon = req.dungeon;
	}

}