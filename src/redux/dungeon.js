import {createSlice} from '@reduxjs/toolkit';
import Dungeon from '../dungeon/Dungeon';
import themes from '../dungeon/img/themes';

const initialState = {
	dungeon: null,
	width: 0,
	height: 0,
	cellWidth: 0,
	cellHeight: 0,
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
			dungeon = new Dungeon(action.payload.node, themes);
			state.dungeon = dungeon;
			state.width = dungeon.width;
			state.height = dungeon.height;
			state.cellWidth = dungeon.cellWidth;
			state.cellHeight = dungeon.cellHeight;
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
	},
	enums: {
		size: {
			WIDTH: 'width',
			HEIGHT: 'height',
			CELL_WIDTH: 'cellWidth',
			CELL_HEIGHT: 'cellHeight',
		},
	},
};