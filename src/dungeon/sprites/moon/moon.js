import moon_1 from './moon_1.png';
import lunar_1 from './lunar_1.png';
import stars_1 from './stars_1.png';
import stars_2 from './stars_2.png';
import marble_1 from './marble_1.png';
import marble_2 from './marble_2.png';
import metal_1 from './metal_1.png';
import metal_2 from './metal_2.png';
import wood_1 from './wood_1.png';
import galaxy_1 from './galaxy_1.png';
import galaxy_2 from './galaxy_2.png';
import galaxy_2_flow_right from './galaxy_2_flow_right.png';

import heat_full from './heat/heat_full.svg';
import heat_flow_right from './heat/heat_flow_right.svg';
import heat_flow_right_full from './heat/heat_flow_right_full.svg';
import heat_flow_right_semi from "./heat/heat_flow_right_semi.svg"

import grass_1 from './grass_1.png';

import {type, replace, group, tab} from '../../enums';

export default {
	id: 'moon',
	display: 'Moon',
	desc: 'Lunar Sprites',
	sprites: {
		moon_1: {
			display: 'Old Moon Tile',
			src: moon_1,
			type: type.TILE,
		},
		lunar_1: {
			display: 'Moon',
			src: lunar_1,
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
		marble_1: {
			display: 'Light Marble',
			src: marble_1,
			type: type.TILE,
		},
		marble_2: {
			display: 'Dark Marble',
			src: marble_2,
			type: type.TILE,
		},
		metal_1: {
			display: 'Metal Walkway Dark',
			src: metal_1,
			type: type.TILE,
		},
		metal_2: {
			display: 'Metal Walkway Light',
			src: metal_2,
			type: type.TILE,
		},
		wood_1: {
			display: 'Dark Laminate',
			src: wood_1,
			type: type.TILE,
		},
		galaxy_1: {
			display: 'Galaxy 1',
			src: galaxy_1,
			type: type.TILE,
		},
		galaxy_2: {
			display: 'Galaxy 2',
			src: galaxy_2,
			type: type.TILE,
		},
		galaxy_2_flow_right: {
			display: 'Galaxy Flow Right',
			src: galaxy_2_flow_right,
			type: type.TILE,
			height: 9 / 8,
		},
		grass_1: {
			display: 'Grass',
			src: grass_1,
			type: type.TILE,
		},
		heat_full: {
			display: 'Heat Tile',
			src: heat_full,
			type: type.TILE,
		},
		heat_flow_right: {
			display: 'Heat Fluid Right',
			src: heat_flow_right,
			type: type.TILE,
			width: 8/16,
			height: 11/8,
		},
		heat_flow_right_full: {
			display: 'Heat Fluid Right',
			src: heat_flow_right_full,
			type: type.TILE,
			width: 8/16,
			height: 12/8,
		},
		heat_flow_right_semi: {
			display: 'Heat Fluid Semi',
			src: heat_flow_right_semi,
			type: type.TILE,
			width: 8/16,
			height: 12/8,
		}
	},
	groups: [
		{
			display: 'Outdoor',
			tab: tab.TILES,
			image: lunar_1,
			type: group.RANDOM,
			data: ['moon_1', 'lunar_1'],
		},
		{
			display: 'Indoor',
			tab: tab.TILES,
			image: marble_1,
			type: group.RANDOM,
			data: ['marble_1', 'marble_2', 'metal_1', 'metal_2', 'wood_1'],
		},
		{
			display: 'Sky',
			tab: tab.TILES,
			image: stars_1,
			type: group.CONTROLLED,
			data: ['stars_1', 'stars_2'],
		},
		{
			display: 'Galaxy',
			tab: tab.TILES,
			image: galaxy_1,
			type: group.CONTROLLED,
			data: ['galaxy_1', 'galaxy_2', 'galaxy_2_flow_right'], // How about using sky/galaxys as a fluid?
		},
		{
			display: 'Test',
			tab: tab.TILES,
			image: grass_1,
			type: group.RANDOM,
			data: ['grass_1'],
		},
		{
			display: "Heat",
			image: heat_flow_right,
			tpe: group.CONTROLLED,
			data: ["heat_full", "heat_flow_right", "heat_flow_right_full", "heat_flow_right_semi"]
		}
	],
};