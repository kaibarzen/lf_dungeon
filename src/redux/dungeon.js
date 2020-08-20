import {createSlice} from '@reduxjs/toolkit';
import Dungeon from '../dungeon/Dungeon';

const initialState = {
	dungeon: null,
	width: 0,
	height: 0,
	cellWidth: 0,
	cellHeight: 0,
	gridOpacity: 0,
	gridEnabled: true,
	backgroundEnabled: true,
	backgroundRepeat: true,
	backgroundOpacity: 1.0,
	onClickCallback: null,
};

// Because of how redux works we cant pass it into the store and have more then 1 fps, instead we pass a ref into the store.
// if we need multiple just use a counter and fake "object oriented" stuff or so
let dungeon = null;

const slice = createSlice({
	name: 'dungeon',
	initialState,
	reducers: {
		init: (state, action) =>
		{
			dungeon = new Dungeon(action.payload.node);
			state.dungeon = dungeon;
			state.width = dungeon.width;
			state.height = dungeon.height;
			state.cellWidth = dungeon.cellWidth;
			state.cellHeight = dungeon.cellHeight;
			state.gridOpacity = dungeon.gridOpacity * 100; // Dungeon.js uses 0-1 we use 0-100
			state.gridEnabled = dungeon.gridEnabled;
			state.backgroundNode = dungeon.backgroundEnabled;
			state.backgroundRepeat = dungeon.backgroundRepeat;
			state.backgroundOpacity = dungeon.backgroundOpacity * 100; // Dungeon.js uses 0-1 we use 0-100
			state.onClickCallback = dungeon.onClickCallback;
		},
		setSize: (state, action) =>
		{
			let {
				width = state.width,
				height = state.height,
				cellWidth = state.cellWidth,
				cellHeight = state.cellHeight,
			} = action.payload;

			width = Math.round(width);
			height = Math.round(height);
			cellWidth = Math.round(cellWidth);
			cellHeight = Math.round(cellHeight);

			if (width > 255 || height > 255)
			{
				return;
			}

			state.width = width;
			state.height = height;
			state.cellWidth = cellWidth;
			state.cellHeight = cellHeight;

			state.dungeon.resize({width, height, cellWidth, cellHeight});
		},
		setGrid: (state, action) =>
		{
			let {
				opacity = state.gridOpacity, // int 0-100
				enabled = state.gridEnabled, // Bool
			} = action.payload;

			state.gridOpacity = opacity;
			state.gridEnabled = enabled;

			state.dungeon.setGrid({enabled, opacity: opacity / 100});
		},
		setBackground: (state, action) =>
		{
			const {
				enabled = state.backgroundEnabled,
				repeat = state.backgroundRepeat,
				opacity = state.backgroundOpacity,
				data,
			} = action.payload;

			state.backgroundEnabled = enabled;
			state.backgroundRepeat = repeat;
			state.backgroundOpacity = opacity;

			if (data)
			{
				state.dungeon.setBackground({enabled, repeat, opacity: opacity / 100, data});
				return;
			}
			state.dungeon.setBackground({enabled, repeat, opacity: opacity / 100});
		},
		setCallbacks: (state, action) =>
		{
			const {
				onClickCallback = state.onClickCallback
			} = action.payload;
			if(dungeon){
				dungeon.onClickCallback = onClickCallback;
			}
		},
	},
});

export default {
	slice,
	actions: slice.actions,
	selectors: {
		getDungeon: (state) =>
		{
			return dungeon;
		},
		getSize: (state) =>
		{
			return {
				width: state.dungeon.width,
				height: state.dungeon.height,
				cellWidth: state.dungeon.cellWidth,
				cellHeight: state.dungeon.cellHeight,
			};
		},
		getGrid: (state) =>
		{
			return {
				enabled: state.dungeon.gridEnabled,
				opacity: state.dungeon.gridOpacity,
			};
		},
		getBackground: (state) =>
		{
			return {
				enabled: state.dungeon.backgroundEnabled,
				opacity: state.dungeon.backgroundOpacity,
				repeat: state.dungeon.backgroundRepeat,
			};
		},
	},
	enums: {
		size: {
			WIDTH: 'width',
			HEIGHT: 'height',
			CELL_WIDTH: 'cellWidth',
			CELL_HEIGHT: 'cellHeight',
		},
		grid: {
			ENABLED: 'enabled',
			OPACITY: 'opacity',
		},
		background: {
			ENABLED: 'enabled',
			OPACITY: 'opacity',
			REPEAT: 'repeat',
		},
	},
};