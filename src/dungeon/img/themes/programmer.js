import grass from './programmer/grass.svg';
import grass2 from './programmer/grass2.svg';
import waterfall from "./programmer/waterfall.svg"
import stairs1 from "./programmer/stairs1.svg"
import wallLeft1 from "./programmer/wallLeft1.svg"

export default {
	data: {
		grass: {
			display: 'Grass',
			src: grass,
			type: "tile",
			height: 9 / 8,
		},
		grass2: {
			display: 'Grass 2',
			src: grass2,
			type: "tile",
			height: 9 / 8,
		},
		waterfall: {
			display: 'Small Waterfall',
			src: waterfall,
			type: "tile",
			height: 10.5 / 8,
			width: 8/16,
		},
		stairs1: {
			display: 'Stairs to the right',
			src: stairs1,
			type: "tile",
			height: 32/16,
			width: 1,
			offsetY: -1,
		},
		wallLeft1: {
			display: 'A fucking wall as you can see',
			src: wallLeft1,
			type: "wallLeft",
			height: 19/8,
			width: 17/16,
			offsetX: -1/16,
			offsetY: -1 - 6/16
		},
	},
	groups: {
		plains: {
			display: "Plains",
			image: grass,
			data: ["grass", "grass2", "waterfall", "stairs1"]
		},
		walls: {
			display: "Walls",
			image: wallLeft1,
			data: ["wallLeft1"]
		}
	}
};