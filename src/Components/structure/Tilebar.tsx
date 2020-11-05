import React from 'react';
import Tools from '../tiles/Tools';
import Tiles from '../tiles/Tiles';
import Groups from '../tiles/Groups';

const Tilebar = () =>
{
	return (
		<div className={"tilebar"}>
			<Tools/>
			<Tiles/>
			<Groups/>
		</div>
	);
};

export default Tilebar;