import React from 'react';
import {Button, Card, Tree} from 'antd';
import {observer} from 'mobx-react-lite';
import {toJS} from 'mobx';
import store from '../../dungeon/store';
import {PlusOutlined} from '@ant-design/icons';

const Layers = observer(() =>
{

	const dungeon = store.dungeon;

	const tree = toJS(dungeon.tree);

	// @ts-ignore
	const onDrop = info =>
	{
		// Disallow Children below non Folders, checks the opt.folder property on the layer class
		if (!info.dropToGap)
		{
			const layer = dungeon.getLayer(info.node.key);
			// @ts-ignore
			if (!layer?.opt?.folder)
			{
				return;
			}
		}

		const dropKey = info.node.props.eventKey;
		const dragKey = info.dragNode.props.eventKey;
		const dropPos = info.node.props.pos.split('-');
		const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

		// @ts-ignore
		const loop = (data, key, callback) =>
		{
			for (let i = 0; i < data.length; i++)
			{
				if (data[i].key === key)
				{
					return callback(data[i], i, data);
				}
				if (data[i].children)
				{
					loop(data[i].children, key, callback);
				}
			}
		};

		const data = tree;

		// Find dragObject
		// @ts-ignore
		let dragObj;
		// @ts-ignore
		loop(data, dragKey, (item, index, arr) =>
		{
			arr.splice(index, 1);
			dragObj = item;
		});

		if (!info.dropToGap)
		{
			// Drop on the content
			// @ts-ignore
			loop(data, dropKey, item =>
			{
				item.children = item.children || [];
				// where to insert 示例添加到尾部，可以是随意位置
				// @ts-ignore
				item.children.push(dragObj);
			});
		}
		else if (
			(info.node.props.children || []).length > 0 && // Has children
			info.node.props.expanded && // Is expanded
			dropPosition === 1 // On the bottom gap
		)
		{
			// @ts-ignore
			loop(data, dropKey, item =>
			{
				item.children = item.children || [];
				// where to insert 示例添加到头部，可以是随意位置
				// @ts-ignore
				item.children.unshift(dragObj);
			});
		}
		else
		{
			let ar;
			let i;
			// @ts-ignore
			loop(data, dropKey, (item, index, arr) =>
			{
				ar = arr;
				i = index;
			});
			if (dropPosition === -1)
			{
				// @ts-ignore
				ar.splice(i, 0, dragObj);
			}
			else
			{
				// @ts-ignore
				ar.splice(i + 1, 0, dragObj);
			}
		}

		dungeon.tree = data;
	};

	const title = (
		<div>
			Layers
			<Button
				shape='circle'
				icon={<PlusOutlined />}
				size={'small'}
				className={'add'}
				onClick={() =>
				{
					store.editor.layerModal = true;
				}}
			/>
		</div>
	);

	return (
		<Card
			title={title}
			bordered={false}
			style={{width: 300}}
			className={'tree'}
		>
			<Tree
				draggable
				blockNode
				onDrop={onDrop}
				treeData={tree}
				checkable={true}
				checkedKeys={dungeon.treeChecked}
				onCheck={(data, e) =>
				{
					// @ts-ignore
					dungeon.treeChecked = data;
				}}
				onSelect={(key, event) =>
				{
					// @ts-ignore
					dungeon.setSelectedLayer(key);
				}}
				onDragStart={store.dungeon.interaction.cancelMouseDown} // Tell interaction that this mousedown is from here so it doesnt start bugging
			/>
		</Card>
	);
});

export default Layers;