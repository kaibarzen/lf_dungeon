import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox as Check, EditableText, H1, Intent} from '@blueprintjs/core';

const Checkbox = ({option, setChange}) =>
{
	return (
		<div>
			<Check
				checked={option.value}
				large={true}
				onChange={(e) =>
				{
					setChange(e.target.checked);
				}}
			>
				{option.title}
			</Check>
		</div>
	);
};

export default Checkbox;