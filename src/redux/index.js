import {
	configureStore,
} from '@reduxjs/toolkit';

import dungeon from './dungeon';
import editor from './editor';
import reduxDungeon from './reduxDungeon';

const store = configureStore({
	reducer: {
		dungeon: reduxDungeon.slice.reducer,
		editor: editor.slice.reducer,
	},
});

export default {
	store,
	dispatch: store.dispatch,
	dungeon,
	editor
};