import React from 'react';
import {useSelector} from 'react-redux';
import redux from '../../../redux';

const Callbacks = () =>
{
	// Its 23:20 i know i fucked up but im tired, so i just smack that down here, sorry future me

	const group = useSelector(redux.editor.selectors.getSpritesGroup);
	const activeTheme = useSelector(redux.editor.selectors.getSpritesTheme);
	const activeSprite = useSelector(redux.editor.selectors.getActiveSprite);
	const activeTool = useSelector(redux.editor.selectors.getSpritesTool);

	// Update on dungeon
	const dungeon = useSelector(redux.dungeon.selectors.getDungeon);

	const place = ({x, y}) =>
	{
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

	const onClickCallback = (e) =>
	{
		place(e)
	};

	const onMouseMoveCallback = (e) =>
	{
		if (e.event.buttons === 1)
		{
			place(e)
		}
	};

	// Still use redux since we change a "permanent" property
	redux.dispatch(redux.dungeon.actions.setCallbacks(
		{
			onClickCallback,
			onMouseMoveCallback,
		},
	));

	return (
		<div>
		</div>
	);
};

export default Callbacks;