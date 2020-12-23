import React from 'react';
import Tree from '../layers/Tree';
import LayerOptions from '../layers/LayerOptions';

const Sidebar = () =>
{
	return (
		<div className={"sidebar"}>
			<Tree />
			<LayerOptions/>
		</div>
	);
};

export default Sidebar;