import grass1 from "./pastel/tiles/grass1.svg"
import normal1 from "./pastel/tiles/normal1.svg"
import water1 from "./pastel/tiles/water1.svg"

export default {
	data: {
		normal1: {
			display: 'Blank Tile 1',
			src: normal1,
			type: "tile",
			tileHeight: 10 / 8,
		},
		grass1: {
			display: 'Grass Tile 1',
			src: grass1,
			type: "tile",
			tileHeight: 10 / 8,
		},
		water1: {
			display: 'Water Tile 1',
			src: water1,
			type: "tile",
			tileHeight: 10 / 8,
		},
	},
	groups: {
		grass: {
			display: "Grass",
			type: "tile",
			image: grass1,
			data: ["normal1", "grass1", "water1"]
		}
	}
};