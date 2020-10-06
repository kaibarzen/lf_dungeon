import {Dungeon} from "./dungeon/Dungeon";

export const dungeon = new Dungeon(undefined);

export default {dungeon}

// DEBUG
// @ts-ignore
window.dungeon = dungeon;