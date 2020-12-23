import React from 'react';
import {optionConstructorItem} from '../../../dungeon/layer/Layer';
import { Switch as AntSwitch } from 'antd';

const Switch = (props: {option: optionConstructorItem, setChange : Function}) =>
{
	return (
		<div className={"input"}>
			<h3>
				{props.option.title}
			</h3>
			<AntSwitch
				checked={props.option.value}
				onChange={(value) =>
				{
					props.setChange(value);
				}}
			/>
		</div>
	);
};

export default Switch;