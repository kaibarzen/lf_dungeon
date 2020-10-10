import React from 'react';
import {CompactPicker} from 'react-color';
import {Divider, FormGroup, H4, NumericInput} from '@blueprintjs/core';

const Number = ({option, setChange}) =>
{
	return (
		<div className={'option_input'}>
			<FormGroup
				label={<H4>{option.title}</H4>}
			>
				<NumericInput
					value={option.value}
					onValueChange={(value) => {
						setChange(value)
					}}
					fill={true}
				/>
			</FormGroup>
		</div>
	);
};

export default Number;