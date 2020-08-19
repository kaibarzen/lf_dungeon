import md5 from 'md5';

class ImageLoader
{
	constructor(themeIndex)
	{
		this.loaded = {};
		this.themeIndex = themeIndex;
		this.backgroundNode = null;
		this.backgroundHash = null;

		// We currently have 1 theme, so no worries about performance
		for (const themeId in themeIndex)
		{
			this.loadTheme(themeId);
		}

	}

	loadTheme(themeId)
	{
		if (!this.themeIndex[themeId])
		{
			throw new Error('Theme does not exist');
		}

		const theme = this.themeIndex[themeId];

		for (const imageId in theme.data)
		{
			this.loadImage(themeId, imageId, theme.data[imageId]);
		}
	}

	loadImage(themeId, spriteId, imageObj)
	{
		let node = new Image();
		node.src = imageObj.src;
		node.onload = function ()
		{
			if (!this.loaded[themeId])
			{
				this.loaded[themeId] = {};
			}

			this.loaded[themeId][spriteId] = {...imageObj, node};
		}.bind(this);
	}

	/**
	 * Get the node if a tile, returns false on failure
	 */
	getImage(themeId, spriteId)
	{
		// This feels so dump and wrong
		if (!this.loaded[themeId] ||
			!this.loaded[themeId][spriteId])
		{
			return false;
		}

		const image = this.loaded[themeId][spriteId];

		//Defaults
		return {
			height: 1,
			width: 1,
			offsetX: 0,
			offsetY: 0,
			...image,
		};
	}

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

export default ImageLoader;