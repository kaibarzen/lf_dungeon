import {Dungeon} from './Dungeon';
import {ImageLibrary} from './ImageLibrary';
import {makeAutoObservable, toJS} from 'mobx';

export const dungeon = new Dungeon(undefined);
export const imageLibrary = new ImageLibrary();

export default {
	dungeon,
	imageLibrary,
	editor: dungeon.editor,
	sprite: dungeon.sprite,
	iom: dungeon.iom,
};

// DEBUG
// @ts-ignore
window.dungeon = dungeon;

// @ts-ignore
window.toJS = toJS;

// @ts-ignore
window.lib = imageLibrary;