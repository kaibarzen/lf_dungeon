import React from 'react';
import {Card, Radio} from 'antd';
import {Tool} from '../../dungeon/Editor';
import store from '../../dungeon/store';
import {observer} from 'mobx-react-lite';
import { RadioChangeEvent } from 'antd/lib/radio';

const Tools = observer(() =>
{

	const onChange = (e: RadioChangeEvent) =>
	{
		store.editor.selectedTool = e.target.value
	};

	return (
		<Card
			title={'Tools'}
			bordered={false}
			style={{width: 300}}
			className={'tools'}
		>
			<Radio.Group
				value={store.editor.selectedTool}
				onChange={onChange}
			>
				<Radio.Button value={Tool.PLACE}> Place Single </Radio.Button>
				<Radio.Button value={Tool.REMOVE}> Remove Single </Radio.Button>
			</Radio.Group>
		</Card>
	);
});

export default Tools;