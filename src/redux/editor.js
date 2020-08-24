import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	dialog: null,
	activeTab: 'tiles',
	spritesTheme: 'moon',
	spritesGroup: null,
	spritesTool: 'single',
	activeSprite: {},
	heatSelected: false,
	heatList: {}, // Not actual heat data but only for management
	heatCounter: 0, // Key management
};

const slice = createSlice({
	name: 'editor',
	initialState,
	reducers: {
		setDialog: (state, action) =>
		{
			state.dialog = action.payload.type;
		},
		closeDialog: (state, action) =>
		{
			state.dialog = null;
		},
		setActiveTab: (state, action) =>
		{
			const {activeTab = state.activeTab} = action.payload;
			state.activeTab = activeTab;
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
			state.activeSprite = action.payload;
			if (state.spritesTool === enums.sprites.tools.REMOVE)
			{
				state.spritesTool = enums.sprites.tools.SINGLE;
			}
		},
		setHeatSelected: (state, action) =>
		{
			const {selected = state.heatSelected} = action.payload;
			state.heatSelected = selected;
		},
		newHeat: (state, action) =>
		{
			state.heatList[state.heatCounter] = {
				id: state.heatCounter, // Lazy id
				display: 'New Heat ID - ' + state.heatCounter,
				opacity: 0.5,
				repeat: false,
			};
			state.heatCounter++;
		},
		setHeat: (state, action) =>
		{
			const id = action.payload.id;
			const item = state.heatList[id];
			state.heatList[id] = {...item, ...action.payload}; // Lazy af
		},
	},
});

const enums = {
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
			HEAT: 'heat',
		},
		active: {
			RANDOM: 'random',
		},
	},
	dialog: {
		'EXPORT': 'export',
	},
};

export default {
	slice,
	actions: slice.actions,
	selectors: {
		getDialog: (state) =>
		{
			return state.editor.dialog;
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
		getHeat: (state) =>
		{
			return {
				selected: state.editor.heatSelected,
				list: state.editor.heatList,
			};
		},
		getHeatSelected: (state) =>
		{
			return state.editor.heatSelected
		},
	},
	enums,
};