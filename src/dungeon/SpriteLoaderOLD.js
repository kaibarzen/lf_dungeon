import md5 from 'md5';
import {type} from './enums';

export default class SpriteLoaderOLD
{
	constructor(registerAll)
	{
		this.sprites = {}; // Unloaded and Loades sprites objects
		this.loaded = {}; // Only loaded Sprites

		this.backgroundNode = null;
		this.backgroundHash = null;

		for (const key in registerAll)
		{
			this.registerSprite(key, registerAll[key]);
		}
	}

	registerSprite(id, object)
	{
		if (!object.src)
		{
			console.warn(`A Sprite with the id "${id}" has no src and its registering has been skipped`);
			return;
		}
		this.sprites[id] = object;
	}

	unregisterSprite(id)
	{
		delete this.sprites[id];
		this.unloadSprite(id);
		return true;
	}

	/**
	 * Loads an sprite, returns true or false depending on success
	 * @param id
	 * @returns {Promise<unknown>}
	 */
	async loadSprite(id)
	{
		return new Promise((resolve, reject) =>
		{
			const obj = this.sprites[id];
			if (!obj)
			{
				resolve(false);
				return;
			}
			let node = new Image();
			node.src = obj.src;
			node.onload = function ()
			{
				this.loaded[id] = {...obj, node};
				resolve(true);
			}.bind(this);
		});
	}

	/**
	 * Unloads a sprite, always returns true
	 * @param id
	 * @returns {boolean}
	 */
	unloadSprite(id)
	{
		delete this.loaded[id];
		return true;
	}

	/**
	 * Return a loaded sprite, returns false on failure and an object on success
	 * @param id
	 * @returns {Promise<boolean|*>}
	 */
	async getSprite(id)
	{
		if (this.loaded[id])
		{
			return this.returnWithDefaults(this.loaded[id]);

		}
		const res = await this.loadSprite(id);

		if (!res)
		{
			return false;
		}
		return this.returnWithDefaults(this.loaded[id]);
	}

	/**
	 * Adds object default so we dont need to worry about that later on
	 * @param obj
	 * @returns {{offsetX: number, offsetY: number, width: number, height: number}}
	 */
	returnWithDefaults(obj)
	{
		switch (obj.type)
		{
			case type.TILE:
				return {
					width: 1,
					height: 1,
					offsetX: 0,
					offsetY: 0,
					...obj,
				};

			default:
				return {
					width: 1,
					height: 1,
					offsetX: 0,
					offsetY: 0,
					...obj,
				};
		}
	}

	/**
	 * Get an background img node from an dataurl
	 * @param dataUrl
	 * @returns {Promise<unknown>}
	 */
	async getBackground(dataUrl)
	{
		return new Promise((resolve, reject) =>
		{
			const hash = md5(dataUrl);

			if (hash === this.backgroundHash)
			{
				resolve(this.backgroundNode);
				return;
			}

			let node = new Image();
			node.src = dataUrl;
			node.onload = function ()
			{
				this.backgroundNode = node;
				resolve(this.backgroundNode);
			}.bind(this);

		});
	}
}