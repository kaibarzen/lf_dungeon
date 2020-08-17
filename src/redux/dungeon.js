import {createSlice} from '@reduxjs/toolkit';
import Dungeon from '../dungeon/Dungeon';
import themes from '../dungeon/img/themes';

const initialState = {
	dungeon: null,
};

// Because of how redux works we cant pass it into the store and have more then 1 fps, instead we pass a ref into the store.
// if we need multiple just use a counter and fake "object oriented" stuff
let dungeon = null;

const slice = createSlice({
	name: 'dungeon',
	initialState,
	reducers: {
		init: (state, action) =>
		{
			dungeon = new Dungeon(action.payload.node, themes);
			state.dungeon = dungeon;
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
	},
};