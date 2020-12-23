import {Typography} from 'antd';
import React from 'react';
import {optionConstructorItem} from '../../../dungeon/layer/Layer';

const Name = (props: { option: optionConstructorItem, setChange: Function }) =>
{
	return (
		<div className={'name'}>
			<Typography.Title
				level={3}
				// @ts-ignore
				editable={{maxLength: 16, onChange: props.setChange}}
			>
				{props.option.value}
			</Typography.Title>
		</div>
	);
};

export default Name;