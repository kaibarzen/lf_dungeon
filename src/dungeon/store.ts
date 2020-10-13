import {Dungeon} from "./Dungeon";
import {ImageLibrary} from './ImageLibrary';

export const dungeon = new Dungeon(undefined);
export const imageLibrary = new ImageLibrary();

export default {dungeon, imageLibrary}

// DEBUG
// @ts-ignore
window.dungeon = dungeon;
// @ts-ignore
window.lib = imageLibrary