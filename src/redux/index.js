import {
	configureStore,
	getDefaultMiddleware,
	createSlice,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import dungeon from './dungeon';

const ownMiddleWare = store => next => action =>
{
	if (action.payload === 'WAS')
	{
		return store; // Return on store on forbidden WAS
	}
	return next(action);
};

// AUTH STATE
const testState = {
	test: 'Nein',
};

const testSlice = createSlice({
	name: 'test',
	initialState: testState,
	reducers: {
		loginSuccess: (state, action) =>
		{
			state.token = action.payload;
		},
		set: (state, action) =>
		{
			state.test = action.payload;
		},
	},
});

const middleware = [
	ownMiddleWare,
];

const store = configureStore({
	reducer: {
		test: testSlice.reducer,
		dungeon: dungeon.slice.reducer,
	},
	middleware,
});

export default {
	store,
	dispatch: store.dispatch,
	dungeon
};