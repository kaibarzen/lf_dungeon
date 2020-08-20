import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	dialogType: null,
	dialogOpen: false,
	activeTab: 'tiles',
	spritesTheme: 'moon',
	spritesGroup: null,
	spritesTool: "single",
	activeSprite: {},
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
			console.log('active', activeTab);
		},
		setSpritesTool: (state, action) =>
		{
			const {tool = state.spritesTool} = action.payload;
			state.spritesTool = tool;
		},
		setSpritesGroup: (state, action) =>
		{
			const {group = state.spritesGroup} = action.payload;
			state.spritesGroup = group;
		},
		setActiveSprite: (state, action) =>
		{
			state.activeSprite = action.payload
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
			return state.editor.activeTab;
		},
		getSpritesTheme: (state) =>
		{
			return state.editor.spritesTheme;
		},
		getSpritesGroup: (state) =>
		{
			return state.editor.spritesGroup;
		},
		getSpritesTool: (state) =>
		{
			return state.editor.spritesTool;
		},
		getActiveSprite: (state) =>
		{
			return state.editor.activeSprite;
		},
	},
	enums: {
		activeTab: {
			'TILES': 'tiles',
			'ENTITYS': 'entitys',
			'GRID': 'grid',
			'BACKGROUND': 'background',
		},
		sprites: {
			tools: {
				SINGLE: 'single',
				PLANE: 'plane',
				REMOVE: 'remove',
			},
			active: {
				RANDOM: "random"
			}
		},
	},
	dialog: {
		types: {
			GRID: 'grid',
		},
	},
};