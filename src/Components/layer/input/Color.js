import React from 'react';
import {CompactPicker} from 'react-color';
import {Divider, FormGroup, H4} from '@blueprintjs/core';

const Color = ({option, setChange}) =>
{
	return (
		<div className={'option_input'}>
			<FormGroup
				label={<H4>{option.title}</H4>}
			>
				<CompactPicker
					color={option.value}
					onChange={(color) =>
					{
						setChange(color.hex);
					}}
				/>
			</FormGroup>
		</div>
	);
};

export default Color;