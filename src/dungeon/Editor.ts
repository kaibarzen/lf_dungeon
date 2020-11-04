import {Dungeon} from './Dungeon';

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

	private dungeon: Dungeon;

	constructor(req: conRequired, params: conParams | undefined)
	{
		this.dungeon = req.dungeon;
	}

}