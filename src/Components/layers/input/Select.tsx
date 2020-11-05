import React from 'react';
import {optionConstructorItem} from '../../../dungeon/layer/Layer';
import {Select as AntSelect} from 'antd';

const Select = (props: { option: optionConstructorItem, setChange: Function }) =>
{
	return (
		<div className={"input"}>
			<h3>
				{props.option.title}
			</h3>
			<AntSelect
				value={props.option.value}
				onChange={(value) =>
				{
					props.setChange(value);
				}}
			>
				{
					// @ts-ignore
					props.option.data?.options?.map((option, i) =>
					{
						return (
							<AntSelect.Option
								value={option.value}
								key={i}
							> {option.display || option.value} </AntSelect.Option>
						);
					})
				}
			</AntSelect>
		</div>
	);
};

export default Select;