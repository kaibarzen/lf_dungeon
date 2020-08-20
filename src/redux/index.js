import {
	configureStore,
} from '@reduxjs/toolkit';
import dungeon from './dungeon';
import editor from './editor';

const ownMiddleWare = store => next => action =>
{
	if (action.payload === 'WAS')
	{
		return store; // Return on store on forbidden WAS
	}
	return next(action);
};

const middleware = [
	ownMiddleWare
];

const store = configureStore({
	reducer: {
		dungeon: dungeon.slice.reducer,
		editor: editor.slice.reducer,
	},
	middleware,
});

export default {
	store,
	dispatch: store.dispatch,
	dungeon,
	editor
};