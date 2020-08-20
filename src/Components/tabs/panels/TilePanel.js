import React from 'react';
import {
	H2,
	Tooltip,
	Position,
	Card,
	H6,
} from '@blueprintjs/core';
import {register} from '../../../dungeon/sprites/index';
import {useSelector} from 'react-redux';
import redux from '../../../redux/index';
import Sprites from './tilePanel/Sprites';
import Tools from './tilePanel/Tools';
import Callbacks from './Callbacks';

const TilePanel = (props) =>
{

	const activeTheme = useSelector(redux.editor.selectors.getSpritesTheme);

	const onChangeGroup = (group) =>
	{
		redux.dispatch(redux.editor.actions.setSpritesGroup({group}));
	};

	const theme = register[activeTheme];

	return (
		<div className={'editor_panel'}>

			<Callbacks/>

			<Tools/>

			<Sprites />

			<H2>Groups</H2>
			<div className={'editor_tiles_group'}>
				{
					theme.groups.map((item, i) =>
					{
						return (
							<Card
								interactive={true}
								elevation={1}
								className={'editor_tiles_group_card'}
								onClick={(e) =>
								{
									onChangeGroup(item);
								}}
							>
								<img
									src={item.image}
									alt={''}
								/>
								<H6> {item.display} </H6>
							</Card>
						);
					})
				}
			</div>

		</div>
	);
};

TilePanel.defaultProps = {};

TilePanel.propTypes = {};

export default TilePanel;