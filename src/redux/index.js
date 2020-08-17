import {
	configureStore,
	getDefaultMiddleware,
	createSlice,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';

const ownMiddleWare = store => next => action =>
{
	if(action.payload === "WAS"){
		return store; // Return on store on forbidden WAS
	}
	return next(action);
};

const middleware = [
	...getDefaultMiddleware(),
	ownMiddleWare,
	logger,
];

// AUTH STATE
const testState = {
	test: 'Nein',
};

export const testSlice = createSlice({
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

export const store = configureStore({
	reducer: {
		test: testSlice.reducer,
	},
	middleware,
});