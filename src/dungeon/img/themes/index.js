import programmer from './programmer';
import grass from './programmer/grass.svg';
import pastel from './pastel';
import grassPastel from "./pastel/tiles/grass1.svg"

export default {
	programmer: {
		display: 'Programmer',
		desc: 'Coding Theme',
		image: grass,
		...programmer,
	},
	pastel: {
		display: 'Pastel',
		desc: 'Pastel Colored Theme',
		image: grassPastel,
		...pastel,
	},
};