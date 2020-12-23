import {InputNumber} from 'antd';
import React from 'react';
import {optionConstructorItem} from '../../../dungeon/layer/Layer';

const Number = (props: { option: optionConstructorItem, setChange: Function }) =>
{
	return (
		<div className={'input'}>
			<h3>
				{props.option.title}
			</h3>
			<InputNumber
				value={props.option.value}
				onChange={(value) =>
				{
					props.setChange(value);
				}}
			/>
		</div>
	);
};

export default Number;