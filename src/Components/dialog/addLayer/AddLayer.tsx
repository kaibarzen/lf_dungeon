import {Button, Divider, Modal} from 'antd';
import React from 'react';
import {observer} from 'mobx-react-lite';
import store from '../../../dungeon/store';
import {
	AppstoreOutlined,
	BgColorsOutlined,
	BorderOutlined,
	BugOutlined,
	FolderOutlined,
	ProjectOutlined,
} from '@ant-design/icons';
import {Layers} from '../../../dungeon/Dungeon';
import Layer from './Layer';

const AddLayer = observer(() =>
{

	const close = () =>
	{
		store.editor.layerModal = false;
	};

	const gen = [
		{
			id: Layers.FOLDER,
			title: <div><FolderOutlined /> Folder </div>,
			content: 'An Folder allows you to group Layer together.',
		},
		{
			id: Layers.COMPOSITE,
			title: <div><FolderOutlined /> Composite Folder </div>,
			content: 'With an Composite Folder you can change the blending mode of the Layers in it. Fancy stuff.',
		},
		{
			id: Layers.TILE,
			title: <div> <BorderOutlined /> Tile Layer </div>,
			content: "That's what you're here for.",
		},
		{
			id: Layers.GRID,
			title: <div> <AppstoreOutlined /> Grid Layer </div>,
			content: "With an Grid Layer you make sure that your players never get lost!"
		},
		{
			id: Layers.BACKGROUND,
			title: <div><ProjectOutlined /> Background Layer </div>,
			content: 'With an Background Layer you can add Images to your Dungeon.',
		},
		{
			id: Layers.SOLID,
			title: <div> <BgColorsOutlined /> Solid Layer </div>,
			content: "Enjoy your Dungeon with an single boring color."
		},
		{
			id: Layers.DEV,
			title: <div> <BugOutlined /> Dev Layer </div>,
			content: "Did you ever hear the Tragedy of the Developers? [...] I thought not. It's not a story the Managers would tell you. [...]"
		}
	];

	return (
		<Modal
			visible={store.editor.layerModal}
			title='Add Layer'
			onCancel={close}
			footer={[
				<Button onClick={close}>
					Cancel
				</Button>,
			]}
			className={"layers"}
		>

			{
				gen.map((item, i) =>
				{
					return <Layer
						id={item.id}
						title={item.title}
						content={item.content}
						key={i}
					/>;
				})
			}

		</Modal>
	);
});

export default AddLayer;