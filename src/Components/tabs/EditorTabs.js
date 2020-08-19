import React from 'react';
import redux from '../../redux/index';
import {useSelector} from 'react-redux';
import {Tab, Tabs, Icon,} from '@blueprintjs/core';
import { IconNames } from "@blueprintjs/icons";
import GridPanel from './panels/GridPanel';

const EditorTabs = (props) =>
{
	const activeTab = useSelector(redux.editor.selectors.getActiveTab);

	const handleChange = (id) =>
	{
		redux.dispatch(redux.editor.actions.setActiveTab({activeTab: id}))
	};

	return (
		<div>
			<Tabs
				onChange={handleChange}
				selectedTabId={activeTab}
				vertical={false}
			>
				<Tab
					id={redux.editor.enums.activeTab.WELCOME}
				>
					<Icon icon={IconNames.BOOKMARK}/> Welcome
				</Tab>
				<Tab
					id={redux.editor.enums.activeTab.SPRITES}
				>
					<Icon icon={IconNames.BUILD}/> Sprites
				</Tab>
				<Tab
					id={redux.editor.enums.activeTab.GRID}
					panel={<GridPanel />}
				>
					<Icon icon={IconNames.GRID}/> Grid
				</Tab>

			</Tabs>
		</div>
	);
};

EditorTabs.defaultProps = {};

EditorTabs.propTypes = {};

export default EditorTabs;