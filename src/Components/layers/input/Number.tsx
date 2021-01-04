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
					switch (typeof value)
					{
						case 'number':
							props.setChange(value);
							break;
						case 'string':
							props.setChange(parseFloat(value));
							break;
						default:
							props.setChange(0);
					}
				}}
			/>
		</div>
	);
};

export default Number;