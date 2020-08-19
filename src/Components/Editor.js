import React from 'react';
import Navigation from './Navigation';
import {Button, Card, Elevation} from '@blueprintjs/core';
import redux from '../redux/index';
import {useSelector} from 'react-redux';
import SettingsDialog from './settings/SettingsDialog';
import EditorTabs from './tabs/EditorTabs';

const Editor = (props) =>
{
	const dungeon = useSelector(redux.dungeon.selectors.getDungeon);

	return (
		<div className={'editor_container'}>

			<SettingsDialog/>
			<Navigation />

			<div className={'editor_sub_container'}>

				<div>
					<Card elevation={Elevation.ONE} className={"panelcard"}>
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