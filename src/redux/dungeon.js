import {createSlice} from '@reduxjs/toolkit';
import {Dungeon} from '../dungeon/Dungeon';

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
	name: 'dungeonOLD',
	initialState,
	reducers: {
		init: (state, action) =>
		{
			if(action.payload.node){
				dungeon = new Dungeon(action.payload.node);
				window.dungeon = dungeon;
			}
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

			state.dungeon.resize({width, height: height * 2, cellWidth, cellHeight});
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

			/*if (dungeon)
			{
				dungeon.setCallbacks(action.payload);
			}*/
		},
		renderHere: (state, action) =>
		{
			dungeon.renderHere();
		},
		renderAs: (state, action) =>
		{
			const {
				cellWidth = dungeon.cellWidth,
				cellHeight = dungeon.cellHeight,
			} = action.payload;
			dungeon.renderAs({cellWidth, cellHeight});
		},
		setHeatCanvas: (state, action) =>
		{
			dungeon.setHeatCanvas(action.payload);
		},
		setTest: (state, action) =>
		{
			state = {...state}; // Apply an update to "all", next see Test selecotr
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
		getTest: (state) =>
		{
			// redux realizes this one is different and gives react an update
			// TODO we basically now need one storage for "updating" and thats it.
			// we missuse redux as bridge and keep our values in a js class
			return dungeon?.width;
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