import React from 'react';
import PropTypes from 'prop-types';
import {Switch as BlueSwitch, EditableText, H1, Intent} from '@blueprintjs/core';

const Switch = ({option, setChange}) =>
{
	return (
		<div>
			<BlueSwitch
				checked={option.value}
				large={true}
				onChange={(e) =>
				{
					setChange(e.target.checked);
				}}
			>
				{option.title}
			</BlueSwitch>
		</div>
	);
};

export default Switch;