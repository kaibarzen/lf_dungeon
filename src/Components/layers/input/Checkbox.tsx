import React from 'react';
import { Checkbox as Check } from 'antd';
import {optionConstructorItem} from '../../../dungeon/layer/Layer';

const Checkbox = (props: {option: optionConstructorItem, setChange : Function}) =>
{
	return (
		<div className={"input"}>
			<h3>
				{props.option.title}
			</h3>
			<Check
				checked={props.option.value}
				onChange={(e) =>
				{
					props.setChange(e.target.checked);
				}}
			>
				{props.option.title}
			</Check>
		</div>
	);
};

export default Checkbox;