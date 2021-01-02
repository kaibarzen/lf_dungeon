import {Dungeon, Layers} from './Dungeon';
import {makeAutoObservable} from 'mobx';
import {allGroups} from './sprites/all';

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
	FILL
}

/**
 * Class to manage ui interactions and selected sprite
 */
export class Editor
{
	get resizeModal(): boolean
	{
		return this._resizeModal;
	}

	set resizeModal(value: boolean)
	{
		this._resizeModal = value;
	}

	set selectedTile(value: string | null)
	{
		if (!this.dungeon.lastSelectedTileLayer)
		{
			this.dungeon.addLayer(Layers.TILE);
		}
		this._selectedTile = value;
	}

	get selectedTile(): string | null
	{
		return this._selectedTile;
	}

	get selectedGroups(): string[]
	{
		return this._selectedGroups;
	}

	get selectedTool(): Tool
	{
		return this._selectedTool;
	}

	set selectedTool(value: Tool)
	{
		this._selectedTool = value;
	}

	set layerModal(value: boolean)
	{
		this._layerModal = value;
	}

	get layerModal(): boolean
	{
		return this._layerModal;
	}

	private _layerModal = false; // Add Layer Modal open/close status
	private _resizeModal = false;
	private _selectedTool: Tool = Tool.PLACE; // Selected tool
	private _selectedGroups: string[] = [];
	// Active Sprites
	private _selectedTile: string | null = null;
	private dungeon: Dungeon;

	constructor(req: conRequired, params: conParams | undefined)
	{
		makeAutoObservable(this);
		this.dungeon = req.dungeon;
	}

	/**
	 * Add or remove an group id to the selected group array
	 * @param id
	 */
	public toggleGroup(id: string)
	{
		if (this._selectedGroups.includes(id))
		{
			this._selectedGroups.splice(this._selectedGroups.indexOf(id), 1);
		}
		else
		{
			this._selectedGroups.push(id);
		}
	}

	/**
	 * Returns an id list of all active tiles which can be selected
	 */
	public getActiveTiles(): string[]
	{
		let out = new Set<string>();

		for (const group of allGroups)
		{
			if (this._selectedGroups.includes(group.id))
			{
				for (const item of group.data)
				{
					out.add(item);
				}
			}
		}

		// @ts-ignore
		return [...out];
	}

}