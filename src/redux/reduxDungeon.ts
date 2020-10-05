import {createSlice} from '@reduxjs/toolkit';
import {Dungeon} from '../dungeon/Dungeon';

// I am too lazy to write my own implementation so i just mistreat redux

let dungeon = null;

const slice = createSlice({
    initialState: {
        dungeon: null,
    },
    name: 'dungeon',
    reducers: {

    }
});

export default {
    slice,
    actions: slice.actions,
    selectors: {
    },
};