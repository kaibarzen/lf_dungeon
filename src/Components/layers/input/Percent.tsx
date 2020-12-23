import {Slider} from 'antd';
import React from 'react';
import {optionConstructorItem} from '../../../dungeon/layer/Layer';

const Percent = (props: { option: optionConstructorItem, setChange: Function }) =>
{
	return (
		<div className={"input"}>
			<h3>
				{props.option.title}
			</h3>
			<Slider
				max={100}
				min={0}
				value={Math.round(props.option.value * 100)}
				onChange={(value: number) =>
				{
					props.setChange(value / 100)
				}}
			/>
		</div>
	);
};

export default Percent;