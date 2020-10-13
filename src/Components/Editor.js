import React from 'react';
import Navigation from './Navigation';
import {Card, Elevation} from '@blueprintjs/core';
import EditorTabs from './tabs/EditorTabs';
import DialogManager from './DialogManager';
import {observer} from 'mobx-react-lite';
import store from '../dungeon/store';

const Editor = observer(({dungeon = store.dungeon}) =>
{
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
						<canvas
							ref={(ref) =>
							{
								dungeon.setCanvas(ref)
							}}
						/>
					</div>
				</div>

			</div>

		</div>
	);
});

export default Editor;