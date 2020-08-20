import React from 'react';
import redux from '../../redux/index';
import {useSelector} from 'react-redux';
import {Tab, Tabs, Icon,} from '@blueprintjs/core';
import { IconNames } from "@blueprintjs/icons";
import GridPanel from './panels/GridPanel';
import BackgroundPanel from './panels/BackgroundPanel';
import TilePanel from './panels/TilePanel';

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
					id={redux.editor.enums.activeTab.TILES}
					panel={<TilePanel/>}
				>
					<Icon icon={IconNames.BUILD}/> Tiles
				</Tab>
				<Tab
					id={redux.editor.enums.activeTab.ENTITYS}
				>
					<Icon icon={IconNames.PERSON}/> Entitys
				</Tab>
				<Tab
					id={redux.editor.enums.activeTab.GRID}
					panel={<GridPanel />}
				>
					<Icon icon={IconNames.GRID_VIEW}/> Grid
				</Tab>
				<Tab
					id={redux.editor.enums.activeTab.BACKGROUND}
					panel={<BackgroundPanel />}
				>
					<Icon icon={IconNames.STYLE}/> Background
				</Tab>
			</Tabs>
		</div>
	);
};

EditorTabs.defaultProps = {};

EditorTabs.propTypes = {};

export default EditorTabs;