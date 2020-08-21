import SpriteLoader from './SpriteLoader';
import {getSprites} from './sprites/index';

class Dungeon
{
	constructor(node, {
		width = 10,
		height = 20,
		cellWidth = 100,
		cellHeight = 50,
		onClickCallback = null,
		data = {tile: {}, entity: [], entityCounter: 0},

		spriteLoader = false,

		gridEnabled = true,
		gridOpacity = 0.5,

		backgroundData = null,
		backgroundEnabled = true,
		backgroundOpacity = 0.5,
		backgroundRepeat = false,

		dev = false,
	} = {})
	{
		this.node = node;

		this.node.style.display = 'grid';

		this.generateCanvas('background', {first: true});
		this.generateCanvas('grid');
		this.generateCanvas('tile');
		this.generateCanvas('entity');
		this.generateCanvas('highlight');

		this.generateCanvas('hitTile', {append: false});
		this.generateCanvas('hitEntity', {append: false});

		// current highlight position
		this.highlightPos = {x: -1, y: -1};
		this.gridEnabled = gridEnabled;
		this.gridOpacity = gridOpacity;

		// Background
		this.backgroundData = backgroundData;
		this.backgroundEnabled = backgroundEnabled;
		this.backgroundOpacity = backgroundOpacity;
		this.backgroundRepeat = backgroundRepeat;

		// Image loader class which manages the loading of images
		this.spriteLoader = spriteLoader ? spriteLoader : new SpriteLoader(getSprites());

		// Events, internal only
		this.highlight.canvas.onmousemove = this.onmousemove;
		this.highlight.canvas.onmouseleave = this.onmouseleave;
		this.highlight.canvas.onclick = this.onclick;

		// Use this for outside stuff
		this.onClickCallback = onClickCallback;

		this.data = data; // {tile, entity}
		this.dev = dev; // Dev mode

		this.resize({
			width,
			height,
			cellWidth,
			cellHeight,
		});
	}

	generateCanvas = (name, {append = true, first = false} = {}) =>
	{
		let canvas = document.createElement('canvas');

		if (append)
		{

			canvas.style.gridColumn = '1';
			canvas.style.gridRow = '1';

			this.node.appendChild(canvas);
		}

		this[name] = {canvas: canvas};
		this[name].context = this[name].canvas.getContext('2d');

	};

	onmousemove = (e) =>
	{
		const rect = this.highlight.canvas.getBoundingClientRect();
		const x = Math.round(e.clientX - rect.left);
		const y = Math.round(e.clientY - rect.top);
		const cords = this.getTileCords(x, y);

		if (this.highlightPos.x !== cords.x || this.highlightPos.y !== cords.y)
		{
			this.highlightPos = cords;
			this.drawHighlight();
		}
	};

	onmouseleave = (e) =>
	{
		this.highlightPos = {x: -1, y: -1};
		this.drawHighlight();
	};

	onclick = (e) =>
	{
		const rect = this.highlight.canvas.getBoundingClientRect();
		const x = Math.round(e.clientX - rect.left);
		const y = Math.round(e.clientY - rect.top);
		const cords = this.getTileCords(x, y);

		if (this.onClickCallback)
		{
			this.onClickCallback({x: cords.x, y: cords.y, event: e});
		}
	};

	setBackground({
		              enabled = this.backgroundEnabled,
		              repeat = this.backgroundRepeat,
		              opacity = this.backgroundOpacity,
		              data = this.backgroundData, // Data Url
		              draw = true,
	              } = {})
	{
		this.backgroundEnabled = enabled;
		this.backgroundRepeat = repeat;
		this.backgroundOpacity = opacity;
		this.backgroundData = data;
		if (draw)
		{
			this.drawBackground();
		}
	}

	/**
	 * Enable/Disable grid and change opacity
	 * @param enabled
	 * @param opacity
	 */
	setGrid({
		        enabled = this.gridEnabled,
		        opacity = this.gridOpacity,
		        draw = true,
	        } = {})
	{
		this.gridEnabled = enabled;
		this.gridOpacity = opacity;
		if (draw)
		{
			this.drawGrid();
		}
	}

	/**
	 * Use this to place data
	 * @param type
	 * @param themeId
	 * @param spriteId
	 * @param x
	 * @param y
	 * @param z
	 * @param tick
	 */
	setTile(id, x, y, z)
	{
		const tile = this.data.tile;

		if (!tile[z])
		{
			tile[z] = {};
		}

		if (!tile[z][y])
		{
			tile[z][y] = {};
		}

		if (!tile[z][y][x])
		{
			tile[z][y][x] = {};
		}

		this.removeTile(x, y, {draw: false}); // We dont want different z level tiles on the same x y slot
		tile[z][y][x] = id;

		this.drawTile();
	}

	/**
	 * Use this to remove data
	 * @param type
	 * @param x
	 * @param y
	 * @param tick
	 */
	removeTile(x, y, {draw = true} = {})
	{
		const tile = this.data.tile;

		for (const z in tile)
		{
			if (!tile[z][y])
			{
				return;
			}
			if (!tile[z][y][x])
			{
				return;
			}
			delete tile[z][y][x];
			break;
		}
		if (draw)
		{
			this.drawTile();
		}
	}

	/**
	 * get the tile cord from x,y cords of the canvas
	 * @param x
	 * @param y
	 */
	getTileCords(x, y)
	{
		const color = this.hitTile.context.getImageData(x, y, 1, 1).data;
		return this.colorToTileCords(color);
	}

	/**
	 * Generates an 2dPath
	 * @param x tile x
	 * @param y tile y
	 * @param grow outline grow in px
	 * @returns {Path2D}
	 */
	generateTileRegion(x, y, {grow = 0} = {})
	{

		const {cellWidth, cellHeight} = this;

		const cords = this.generateTileCords(x, y);

		let region = new Path2D();
		region.moveTo(cords.x + Math.floor(cellWidth * 0.5), cords.y - grow);
		region.lineTo(cords.x + cellWidth + grow, cords.y + Math.floor(cellHeight * 0.5));
		region.lineTo(cords.x + Math.floor(cellWidth * 0.5), cords.y + cellHeight + grow);
		region.lineTo(cords.x - grow, cords.y + Math.floor(cellHeight * 0.5));
		region.closePath();

		return region;
	}

	/**
	 * Returns canvas cords from tile cords
	 * @param x
	 * @param y
	 * @returns {{x: number, y: number}}
	 */
	generateTileCords(x, y)
	{
		const {cellWidth, cellHeight} = this;
		if (y % 2 === 0)
		{
			return {
				x: x * cellWidth,
				y: Math.floor(y * 0.5) * cellHeight - Math.floor(cellHeight * 0.5),
			};
		}
		return {
			x: x * cellWidth - Math.floor(cellWidth * 0.5),
			y: Math.floor(y * 0.5) * cellHeight,
		};
	}

	/**
	 * Resize the canvas
	 * @param width
	 * @param height
	 * @param cellWidth
	 * @param cellHeight
	 */
	resize({
		       width = this.width,
		       height = this.height,
		       cellWidth = this.cellWidth,
		       cellHeight = this.cellHeight,
	       } = {})
	{
		this.width = width;
		this.height = height;
		this.cellWidth = cellWidth;
		this.cellHeight = cellHeight;

		const canvasWidth = width * cellWidth;
		const canvasHeight = height * cellHeight * 0.5;

		const list = [this.background, this.grid, this.tile, this.entity, this.highlight, this.hitTile];
		for (const item of list)
		{
			item.canvas.width = canvasWidth;
			item.canvas.height = canvasHeight;
		}

		this.drawAll();
	}

	drawBackground = () =>
	{
		return new Promise(async (resolve, reject) =>
		{
			const {width, height, cellWidth, cellHeight, backgroundEnabled, backgroundOpacity, backgroundRepeat, backgroundData} = this;
			this.clearCanvas(this.background);

			console.log("BACKDATA", !!backgroundData)

			if (!backgroundEnabled)
			{
				resolve(false);
				return;
			}

			if (!backgroundData)
			{
				resolve(false);
				return;
			}

			const canvasWidth = width * cellWidth;
			const canvasHeight = height * cellHeight * 0.5;
			const img = await this.spriteLoader.getBackground(backgroundData);

			this.background.context.globalAlpha = backgroundOpacity;

			if (backgroundRepeat)
			{
				const pattern = this.background.context.createPattern(img, 'repeat');
				this.background.context.fillStyle = pattern;
				this.background.context.fillRect(0, 0, canvasWidth, canvasHeight);
				resolve(true);
				return;
			}

			this.background.context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvasWidth, canvasHeight);
			resolve(true);

		});
	};

	drawGrid = () =>
	{
		const {grid, width, height, gridOpacity, gridEnabled} = this;
		this.clearCanvas(this.grid);

		if (!gridEnabled)
		{
			return;
		}

		// Always to +1 to get tiles at the edges
		for (let y = 0; y < height + 1; y++)
		{
			for (let x = 0; x < width + 1; x++)
			{
				grid.context.lineWidth = 1;
				grid.context.strokeStyle = `rgba(200,200,200, ${gridOpacity})`;
				grid.context.stroke(this.generateTileRegion(x, y));
			}
		}
	};

	/**
	 * Draws Tiles
	 */
	drawTile = async () =>
	{
		const {data} = this;
		this.clearCanvas(this.tile);

		for (const z in data.tile)
		{
			for (const y in data.tile[z])
			{
				for (const x in data.tile[z][y])
				{
					const cords = this.generateTileCords(x, y);
					const sprite = await this.spriteLoader.getSprite(data.tile[z][y][x]);
					if (sprite)
					{
						this.drawSingleTile(sprite, cords.x, cords.y);
					}
				}
			}
		}

	};

	drawSingleTile(sprite, x, y)
	{
		x += Math.floor(sprite.offsetX * this.cellWidth);
		y += Math.floor(sprite.offsetY * this.cellHeight);

		const width = this.cellWidth * sprite.width;
		const height = this.cellHeight * sprite.height;

		this.tile.context.drawImage(sprite.node, x, y, width, height);
	}

	/**
	 * Draws entitys
	 * TODO drawEntity
	 */
	drawEntity = () =>
	{
		// data = {tile: {}, entity: [], entityCounter: 0, background: null},

		// visible + canvas
		// https://stackoverflow.com/questions/45706829/change-color-image-in-canvas

	};

	setEntity(themeId, spriteId, x, y)
	{
		const id = this.data.entityCounter;
		this.data.entityCounter++;

		this.data.entity.push({
			id,
			color: this.entityIdToColor(id),
			x,
			y,
			themeId,
			spriteId,
		});
		this.drawEntity();
	}

	removeEntity(color)
	{
		return this.removeEntityById(this.colorToEntityId(color));
	}

	removeEntityById(id)
	{
		const item = this.data.entity.find((item) =>
		{
			return item.id === id;
		});
		const index = this.data.entity.indexOf(item);
		this.data.entity.splice(index, 1);
	}

	colorToEntityId(color)
	{
		return parseInt(color[0] + color[1], 2);
	}

	entityIdToColor(counter)
	{
		if (counter > 65535)
		{
			throw new Error('Width/Height Exceeds 255');
		}
		let string = '0000000000000000' + counter.toString(2);
		string = string.substr(string.length - 16);
		return `rgb(${string.substr(0, 8)}, ${string.substr(8, 8)}, 0)`;
	}

	/**
	 * Draws the highlighting canvas
	 */
	drawHighlight = () =>
	{
		this.clearCanvas(this.highlight);
		this.highlight.context.fillStyle = 'rgba(255,0,255, 0.7)';
		this.highlight.context.fill(this.generateTileRegion(this.highlightPos.x, this.highlightPos.y));
	};

	/**
	 * Draws hit canvas for tiles
	 */
	drawHitTile = () =>
	{
		const {width, height, tileCordsToColor, hitTile} = this;
		this.clearCanvas(hitTile);

		// Always to +1 to get tiles at the edges
		for (let y = 0; y < height + 1; y++)
		{
			for (let x = 0; x < width + 1; x++)
			{
				hitTile.context.fillStyle = tileCordsToColor(x, y);
				hitTile.context.fill(this.generateTileRegion(x, y, {grow: 1}));
			}
		}
	};

	drawDev()
	{
		const {background, width, height, cellWidth, cellHeight, dev} = this;

		if (!dev)
		{
			return;
		}

		for (let y = 0; y < height + 1; y++)
		{
			for (let x = 0; x < width + 1; x++)
			{
				const cords = this.generateTileCords(x, y);
				background.context.lineWidth = 1;
				background.context.strokeStyle = y % 2 === 0 ? 'rgb(255,0,0)' : 'rgb(0,0,255)';
				background.context.fillStyle = y % 2 === 0 ? 'rgb(255,0,0)' : 'rgb(0,0,255)';
				background.context.strokeRect(cords.x, cords.y, cellWidth, cellHeight);
				background.context.fillRect(cords.x, cords.y, 8, 8);
				background.context.fillText(`${x} - ${y}`, cords.x, cords.y);
			}
		}

	}

	/**
	 * Clear a canvas/context
	 * @param canvasObject {canvas, context} object
	 */
	clearCanvas = (canvasObject) =>
	{
		canvasObject.context.clearRect(0, 0, canvasObject.canvas.width, canvasObject.canvas.height);
	};

	/**
	 * Wrapper to call all draw* functions
	 */
	drawAll = async () =>
	{
		const res1 = this.drawBackground();
		this.drawGrid();
		const res = this.drawTile();
		this.drawEntity();
		this.drawHighlight();
		this.drawHitTile();
		this.drawDev();
		const wait = await res;
		const wair2 = await res1;
	};

	/**
	 * Calculates tile x y cords to a color
	 * @param x
	 * @param y
	 * @returns {string}
	 */
	tileCordsToColor(x, y)
	{
		if (x > 255 || y > 255)
		{
			throw new Error('Width/Height Exceeds 255');
		}

		if (x < 0 || y < 0)
		{
			throw new Error('Width/Height Must be larger then -1');
		}

		return `rgb(${x}, ${y}, 0)`;
	}

	/**
	 * Transform context.getImageData array to cords
	 * Use this function, in the future it will be replaced with a more complicated one
	 * @param color
	 */
	colorToTileCords(color)
	{
		return {
			x: color[0],
			y: color[1],
		};
	}

	/**
	 * Download the currently displayed canvas
	 */
	renderHere({mimeType = 'image/png', extension = 'png'} = {})
	{
		let exportCanvas = document.createElement('canvas');
		let exportContext = exportCanvas.getContext(('2d'));

		exportCanvas.width = this.width * this.cellWidth;
		exportCanvas.height = this.height * this.cellHeight * 0.5;

		const draw = ['background', 'grid', 'tile', 'entity'];
		for (const item of draw)
		{
			exportContext.drawImage(this[item].canvas, 0, 0);
		}

		const img = exportCanvas.toDataURL(mimeType);
		let link = document.createElement('a');
		link.download = 'Dungeon.' + extension;
		link.href = img;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	/**
	 * Render a new canvas with another cell resolution and download it
	 * @param cellWidth
	 * @param cellHeight
	 * @param mimeType
	 * @param extension
	 */
	async renderAs({
		               cellWidth = this.cellWidth,
		               cellHeight = this.cellHeight,
		               mimeType = 'image/png',
		               extension = 'png',
	               } = {})
	{
		let node = document.createElement('div');
		let renderDungeon = new Dungeon(node, {
			cellWidth,
			cellHeight,
			width: this.width,
			height: this.height,
			data: this.data,
			spriteLoader: this.spriteLoader,

			gridEnabled: this.gridEnabled,
			gridOpacity: this.gridOpacity,

			backgroundData: this.backgroundData,
			backgroundEnabled: this.backgroundEnabled,
			backgroundOpacity: this.backgroundOpacity,
			backgroundRepeat: this.backgroundRepeat,
		});
		await renderDungeon.drawAll()
		renderDungeon.renderHere({mimeType, extension});
	}

}

export default Dungeon;