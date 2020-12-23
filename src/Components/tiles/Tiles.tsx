import React from 'react';

import './Tiles.sass';
import {Card} from 'antd';
import {observer} from 'mobx-react-lite';
import store from '../../dungeon/store';
import Tile from './Tile';

const Tiles = observer(() =>
{

	const tiles = store.editor.getActiveTiles();

	return (
		<Card
			title={'Tiles'}
			bordered={false}
			style={{width: 300}}
			className={'tiles'}
		>
			<div className={'content'}>
				{
					tiles.map((item, i) =>
					{
						return (
							<Tile
								id={item}
								key={i}
							/>
						);
					})
				}
			</div>
		</Card>
	);
});

export default Tiles;