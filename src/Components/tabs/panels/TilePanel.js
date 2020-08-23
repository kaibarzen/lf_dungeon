import React from 'react';
import {
	H2,
	Card,
	H6,
} from '@blueprintjs/core';
import {register} from '../../../dungeon/sprites/index';
import {useSelector} from 'react-redux';
import redux from '../../../redux/index';
import Sprites from './tilePanel/Sprites';
import Tools from './tilePanel/Tools';
import Callbacks from './Callbacks';
import Group from './tilePanel/Groups';
import Heat from './tilePanel/Heat';

const TilePanel = (props) =>
{

	const activeTool = useSelector(redux.editor.selectors.getSpritesTool)

	return (
		<div className={'editor_panel'}>

			<Callbacks/>
			<Tools/>

			{
				activeTool === redux.editor.enums.sprites.tools.HEAT ?
					<div>
						<Heat/>
					</div>
					:
					<div>
					</div>
			}
			<Sprites />
			<Group/>

		</div>
	);
};

export default TilePanel;