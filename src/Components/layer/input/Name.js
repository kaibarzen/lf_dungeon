import React from 'react';
import PropTypes from 'prop-types';
import {EditableText, H1, Intent} from '@blueprintjs/core';

const Name = ({option, setChange}) =>
{
	return (
		<div>
			<H1>
				<EditableText
					intent={Intent.PRIMARY}
					maxLength={32}
					value={option.value}
					onChange={(newValue) =>
					{
						setChange(newValue)
					}}
				/>
			</H1>
		</div>
	);
};

export default Name;