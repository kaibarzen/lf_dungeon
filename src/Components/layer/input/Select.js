import React from 'react';
import {CompactPicker} from 'react-color';
import {Divider, FormGroup, H4, HTMLSelect, NumericInput} from '@blueprintjs/core';

const Select = ({option, setChange}) =>
{
	return (
		<div className={'option_input'}>
			<FormGroup
				label={<H4>{option.title}</H4>}
			>
				<HTMLSelect
					fill={true}
					value={option.value}
					onChange={(e) =>
					{
						setChange(e.target.value)
					}}
				>
					{
						option.data?.options?.map((option, i) =>
						{
							return (
								<option value={option.value} key={i}> {option.display || option.value} </option>
							);
						})
					}
				</HTMLSelect>
			</FormGroup>
		</div>
	);
};

export default Select;