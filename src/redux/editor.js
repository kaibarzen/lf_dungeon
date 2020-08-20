import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	dialogType: null,
	dialogOpen: false,
	activeTab: null,
};

const slice = createSlice({
	name: 'editor',
	initialState,
	reducers: {
		setDialog: (state, action) =>
		{
			state.dialogType = action.payload.type || state.dialogType;
			state.dialogOpen = action.payload.open;
		},
		setActiveTab: (state, action) =>
		{
			const {activeTab = state.activeTab} = action.payload;
			state.activeTab = activeTab;
			console.log("active", activeTab)
		},
	},
});

export default {
	slice,
	actions: slice.actions,
	selectors: {
		getDialog: (state) =>
		{
			return {type: state.editor.dialogType, open: state.editor.dialogOpen};
		},
		getActiveTab: (state) =>
		{
			return state.activeTab;
		},
	},
	enums: {
		activeTab: {
			"TILES": "tiles",
			"ENTITYS": "entitys",
			"GRID": "grid",
			"BACKGROUND": "background"
		},
	},
	dialog: {
		types: {
			GRID: 'grid',
		},
	},
};