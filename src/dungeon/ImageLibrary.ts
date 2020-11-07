import localforage from 'localforage';
import {makeAutoObservable} from 'mobx';

export class ImageLibrary
{
	get select(): boolean
	{
		return this._select;
	}

	get keys(): string[]
	{
		return this._keys;
	}

	get dialog(): boolean
	{
		return this._dialog;
	}

	private store;
	private thumbnailStore;
	private _dialog: boolean = false;
	private _select: boolean = false;
	private callback: Function | null = null;
	private _keys: string[] = [];

	constructor()
	{
		makeAutoObservable(this);

		this.store = localforage.createInstance({
			name: 'imageLibrary',
			storeName: 'images',
		});

		this.thumbnailStore = localforage.createInstance({ // TODO implement thumnailStore with resize
			name: 'imageLibrary',
			storeName: 'thumbnails',
		});

		this.refreshKeys();
	}

	/**
	 * Save an image, returns the id
	 * @param data dataurl
	 */
	async addImage(data: string): Promise<string>
	{
		const id = new Date().getTime().toString(16);
		await this.store.setItem(id, data);
		await this.thumbnailStore.setItem(id, data); // Todo resize
		this.refreshKeys();
		return id;
	}

	/**
	 * remove an image and thumbnail by id
	 * @param id
	 */
	async removeImage(id: string): Promise<void>
	{
		await this.store.removeItem(id);
		await this.thumbnailStore.removeItem(id);
		this.refreshKeys();
	}

	// Todo make one with <img/> caching
	/**
	 * Get image dataurl by id
	 * @param id
	 */
	async getImage(id: string): Promise<string | null>
	{
		return this.store.getItem(id);
	}

	/**
	 * get Thumbnail dataurl by id
	 * @param id
	 */
	async getThumbnail(id: string): Promise<string | null>
	{
		return this.thumbnailStore.getItem(id);
	}

	/**
	 * Refresh the intenal list of keys
	 */
	async refreshKeys()
	{
		this._keys = await this.store.keys();
	}

	/**
	 * On Image Select function, used for userSelect
	 * @param key
	 */
	onSelect(key: string)
	{
		if (this.callback)
		{
			this.callback(key);
			this.callback = null;
		}
		this.closeDialog();
	}

	/**
	 * Call for the User to select an image, returns the key (String) of the image or null on cancel/no select
	 * @param callback
	 */
	async userSelect(callback: Function)
	{
		this.callback = callback;
		this._select = true;
		this._dialog = true;
	}

	/**
	 * CLoses the dialog and cancels userSelect
	 */
	closeDialog()
	{
		this._select = false;
		this._dialog = false;
		if (this.callback)
		{
			this.callback(null);
		}
	}

	openDialog()
	{
		this._dialog = true;
	}

}