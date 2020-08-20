import moon_1 from './moon_1.png';
import lunar_1 from './lunar_1.png';
import galaxy_1 from './galaxy_1.png';
import stars_1 from './stars_1.png';
import stars_2 from './stars_2.png';
import {type, replace, group, tab} from '../../enums';

export default {
	id: 'moon',
	display: 'Moon',
	desc: 'Lunar Sprites',
	sprites: {
		lunar_1: {
			display: 'Moon',
			src: lunar_1,
			type: type.TILE,
			replace: replace.FLOOR_OUTSIDE_PRIMARY,
		},
		galaxy_1: {
			display: 'Galaxy',
			src: galaxy_1,
			type: type.TILE,
			replace: replace.FLOOR_OUTSIDE_PRIMARY,
		},
		stars_1: {
			display: 'Stars 1',
			src: stars_1,
			type: type.TILE,
			replace: replace.FLOOR_OUTSIDE_PRIMARY,
		},
		stars_2: {
			display: 'Stars 2',
			src: stars_2,
			type: type.TILE,
			replace: replace.FLOOR_OUTSIDE_PRIMARY,
		},
	},
	groups: [
		{
			display: 'Outdoor',
			tab: tab.TILES,
			image: lunar_1,
			type: group.CONTROLLED,
			data: ['lunar_1'],
		},
		{
			display: 'Sky',
			tab: tab.TILES,
			image: stars_1,
			type: group.CONTROLLED,
			data: ['stars_1', 'stars_2'],
		},
	],
};