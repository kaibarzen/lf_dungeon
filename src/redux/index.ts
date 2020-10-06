import {
	configureStore,
} from '@reduxjs/toolkit';

import editor from './editor';

const store = configureStore({
	reducer: {
		editor: editor.slice.reducer,
	},
});

export default {
	store,
	dispatch: store.dispatch,
	editor
};