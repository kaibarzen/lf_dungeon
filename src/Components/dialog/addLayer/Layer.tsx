import Card from 'antd/lib/card';
import React from 'react';
import {Divider} from 'antd';
import store from '../../../dungeon/store';
import {Layers} from '../../../dungeon/Dungeon';

const Layer = (props: { id: Layers, title: React.ReactNode, content: React.ReactNode }) =>
{

	const onClick = () =>
	{
		store.dungeon.addLayer(props.id);
		store.editor.layerModal = false;
	};

	return (
		<Card
			className={'layer'}
			onClick={onClick}
		>
			<div>
				<Divider
					orientation='left'
					className={'divider'}
				>
					<h4> {props.title} </h4>
				</Divider>
				<p>
					{props.content}
				</p>
			</div>
		</Card>
	);
};

export default Layer;