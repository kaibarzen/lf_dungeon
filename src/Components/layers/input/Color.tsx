import React from 'react';
import {CompactPicker} from 'react-color';
import {optionConstructorItem} from '../../../dungeon/layer/Layer';

const Color = (props: {option: optionConstructorItem, setChange : Function}) =>
{
	return (
		<div className={"input"}>
			<h3>
				{props.option.title}
			</h3>
			<CompactPicker
				color={props.option.value}
				onChange={(color) =>
				{
					props.setChange(color.hex);
				}}
			/>
		</div>
	);
};

export default Color;