import React from 'react';
import PropTypes from 'prop-types';
import {H2, Tooltip} from '@blueprintjs/core';
import {useSelector} from 'react-redux';
import redux from '../../../../redux';
import {register} from '../../../../dungeon/sprites';
import random from '../../../../img/random.png';

const Sprites = (props) =>
{

	const activeTheme =useSelector(redux.editor.selectors.getSpritesTheme);
	const group = useSelector(redux.editor.selectors.getSpritesGroup);
	const activeSprite = useSelector(redux.editor.selectors.getActiveSprite);

	const theme = register[activeTheme];

	const onChangeSprite = (sprite) =>
	{
		redux.dispatch(redux.editor.actions.setActiveSprite(sprite));
	};

	const getSprite = (name) =>
	{
		if (!theme.sprites[name])
		{
			return false;
		}
		return {
			id: [theme.id, name].join('/'),
			...theme.sprites[name],
		};
	};

	if (!group)
	{
		return (
			<div>
				<H2>Tiles</H2>
				<div>Select a group to start!</div>
			</div>
		);
	}

	return (
		<div>
			<H2>Tiles - {group.display}</H2>
			<div className={'editor_tiles_group'}>

				{
					group.type === 'random' ?
						<Tooltip content={'Random'}>
							<img
								src={random}
								alt={''}
								onClick={() =>
								{
									onChangeSprite({type: redux.editor.enums.sprites.active.RANDOM});
								}}
								className={activeSprite.type === 'random' ? 'selected' : ''}
							/>
						</Tooltip>
						:
						<div></div>
				}

				{
					group.data.map((item, i) =>
					{
						const sprite = getSprite(item);
						if (!sprite)
						{
							return (
								<div
									key={i}
								>
								</div>
							);
						}
						return (
							<Tooltip
								content={sprite.display}
								key={i}
							>
								<img
									src={sprite.src}
									alt={''}
									onClick={() =>
									{
										onChangeSprite(sprite);
									}}
									className={activeSprite.id === [theme.id, item].join('/') ? 'selected' : ''}
								/>
							</Tooltip>
						);
					})
				}
			</div>
		</div>
	);
};

Sprites.defaultProps = {};

Sprites.propTypes = {
	group: PropTypes.object,
};

export default Sprites;