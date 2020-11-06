import React from 'react';
import {Form, InputNumber} from 'antd';

interface Props
{
	passDown: object,
	name: string,
	label: string,
	onChange: Function,
	value: any,
}

const Input = ({passDown, value, name, label, onChange}: Props) =>
{
	const hereChange = (value: any) =>
	{
		onChange({[name]: value});
	};

	return (
		<Form.Item label={label}>
			<InputNumber
				{...passDown}
				value={value}
				onChange={hereChange}
				className={'number'}
			/>
		</Form.Item>
	);
};

export default Input;