import React from 'react';
import 'antd/dist/antd.css';
import {Tree} from 'antd';
import {observer} from 'mobx-react-lite';
import store from '../../../store';
import {toJS} from 'mobx';
import LayerOptions from './LayerOptions';
import {FolderLayer} from '../../../dungeon/layer/Folder';

const Layers = observer(({dungeon = store.dungeon}) =>
{

	const tree = toJS(dungeon.tree);

	const onDrop = info =>
	{
		console.log("NODE", info.node.key, info)
		// Disallow Children below non Folders, checks the opt.folder property on the layer class
		if(!info.dropToGap){
			const layer = dungeon.getLayer(info.node.key);
			if(!layer?.opt?.folder){
				return;
			}
		}

		const dropKey = info.node.props.eventKey;
		const dragKey = info.dragNode.props.eventKey;
		const dropPos = info.node.props.pos.split('-');
		const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

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
		let dragObj;
		loop(data, dragKey, (item, index, arr) =>
		{
			arr.splice(index, 1);
			dragObj = item;
		});

		if (!info.dropToGap)
		{
			// Drop on the content
			loop(data, dropKey, item =>
			{
				item.children = item.children || [];
				// where to insert 示例添加到尾部，可以是随意位置
				item.children.push(dragObj);
			});
		} else if (
			(info.node.props.children || []).length > 0 && // Has children
			info.node.props.expanded && // Is expanded
			dropPosition === 1 // On the bottom gap
		)
		{
			loop(data, dropKey, item =>
			{
				item.children = item.children || [];
				// where to insert 示例添加到头部，可以是随意位置
				item.children.unshift(dragObj);
			});
		} else
		{
			let ar;
			let i;
			loop(data, dropKey, (item, index, arr) =>
			{
				ar = arr;
				i = index;
			});
			if (dropPosition === -1)
			{
				ar.splice(i, 0, dragObj);
			} else
			{
				ar.splice(i + 1, 0, dragObj);
			}
		}

		dungeon.tree = data;
	};

	return (
		<div>
			<Tree
				draggable
				blockNode
				onDrop={onDrop}
				treeData={tree}
				checkable={true}
				checkedKeys={dungeon.treeChecked}
				onCheck={(data, e) =>
				{
					dungeon.treeChecked = data;
				}}
				onSelect={(key, event) =>
				{
					dungeon.setSelectedLayer(key);
				}}
			/>

			<LayerOptions />
		</div>
	);
});

export default Layers;