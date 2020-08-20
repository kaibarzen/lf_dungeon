import grass from './grass.svg';
import {type, replace, group} from '../../enums';

export default {
	id: 'moon',
	display: 'Moon',
	desc: 'Lunar Sprites',
	sprites: {
		grass: {
			display: 'Grass',
			src: grass,
			type: type.TILE,
			replace: replace.FLOOR_OUTSIDE_PRIMARY,
			height: 9 / 8,
		},
	},
	groups: [
		{
			display: 'Plains',
			image: grass,
			type: group.CONTROLLED,
			data: ['grass'],
		},
	],
};