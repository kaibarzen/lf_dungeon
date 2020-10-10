import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox as Check, EditableText, H1, Intent} from '@blueprintjs/core';

const Checkbox = ({option, setChange}) =>
{
	return (
		<div>
			<H1>
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
			</H1>
		</div>
	);
};

export default Checkbox;