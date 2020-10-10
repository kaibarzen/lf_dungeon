import React from 'react';
import {CompactPicker} from 'react-color';
import {Divider, FormGroup, H4, Slider} from '@blueprintjs/core';

const Percent = ({option, setChange}) =>
{
	return (
		<div className={'option_input'}>
			<FormGroup
				label={<H4>{option.title}</H4>}
			>
				<Slider
					value={Math.round(option.value * 100)}
					min={0}
					max={100}
					onChange={(value) =>
					{
						setChange(value / 100)
					}}
					labelRenderer={(value) => {
						return `${value}%`;
					}}
					labelStepSize={20}
				/>
			</FormGroup>
		</div>
	);
};

export default Percent;