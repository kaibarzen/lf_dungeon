import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import redux from '../../../redux';

const Callbacks = (props) =>
{
	// Its 23:20 i know i fucked up but im tired, so i just smack that down here, sorry future me

	const group = useSelector(redux.editor.selectors.getSpritesGroup);
	const activeTheme = useSelector(redux.editor.selectors.getSpritesTheme);
	const activeSprite = useSelector(redux.editor.selectors.getActiveSprite);
	const activeTool = useSelector(redux.editor.selectors.getSpritesTool);

	// Update on dungeon
	const dungeon = useSelector(redux.dungeon.selectors.getDungeon);

	const onClickCallback = (e) =>
	{
		const {x, y, event} = e;
		console.log("FUUUUUUUU", activeSprite.type, redux.editor.enums.sprites.active.RANDOM);

		switch (activeTool)
		{
			case redux.editor.enums.sprites.tools.SINGLE:
				if (activeSprite.type !== redux.editor.enums.sprites.active.RANDOM)
				{
					dungeon.setTile(activeSprite.id, x, y, 100);
					return;
				}
				const spriteName = group.data[Math.floor(Math.random() * group.data.length)];
				dungeon.setTile([activeTheme, spriteName].join('/'), x, y, 100);
				return;

			case redux.editor.enums.sprites.tools.PLANE:
				console.warn('Tool / Plane WIP');
				return;

			case redux.editor.enums.sprites.tools.REMOVE:
				dungeon.removeTile(x, y);
				return;
		}
	};

	// Still use redux since we change a "permanent" property
	redux.dispatch(redux.dungeon.actions.setCallbacks({onClickCallback}));

	return (
		<div>
		</div>
	);
};

Callbacks.defaultProps = {};

Callbacks.propTypes = {};

export default Callbacks;