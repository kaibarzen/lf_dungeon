import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import redux from '../../../../redux';
import {register} from '../../../../dungeon/sprites';
import {Card, H2, H6} from '@blueprintjs/core';

const Group = (props) =>
{

	const activeTheme = useSelector(redux.editor.selectors.getSpritesTheme);

	const onChangeGroup = (group) =>
	{
		redux.dispatch(redux.editor.actions.setSpritesGroup({group}));
	};

	const theme = register[activeTheme];


	return (
		<div>
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
								key={i}
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

Group.defaultProps = {};

Group.propTypes = {};

export default Group;