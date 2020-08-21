import React from 'react';
import Navigation from './Navigation';
import {Card, Elevation} from '@blueprintjs/core';
import redux from '../redux/index';
import {useSelector} from 'react-redux';
import EditorTabs from './tabs/EditorTabs';
import DialogManager from './DialogManager';

const Editor = (props) =>
{
	const dungeon = useSelector(redux.dungeon.selectors.getDungeon);

	return (
		<div className={'editor_container'}>

			<DialogManager />
			<Navigation />

			<div className={'editor_sub_container'}>

				<div>
					<Card
						elevation={Elevation.ONE}
						className={'panelcard'}
					>
						<EditorTabs />
					</Card>
				</div>

				<div className={'editor_canvas_container'}>
					<div className={'editor_canvas'}>
						<div
							ref={(ref) =>
							{
								if (dungeon || !ref)
								{
									return;
								}
								redux.dispatch(redux.dungeon.actions.init({node: ref}));
							}}
						>
						</div>
					</div>
				</div>

			</div>

		</div>
	);
};

export default Editor;