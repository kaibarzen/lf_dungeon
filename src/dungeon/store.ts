import {Dungeon} from './Dungeon';
import {ImageLibrary} from './ImageLibrary';

export const dungeon = new Dungeon(undefined);
export const imageLibrary = new ImageLibrary();

export default {
	dungeon,
	imageLibrary,
	editor: dungeon.editor,
	sprite: dungeon.sprite,
};

// DEBUG
// @ts-ignore
window.dungeon = dungeon;
// @ts-ignore
window.lib = imageLibrary;