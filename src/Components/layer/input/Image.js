import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Switch as BlueSwitch, EditableText, H1, Intent, Button, H4} from '@blueprintjs/core';
import {imageLibrary as lib} from '../../../dungeon/store';

const Image = ({option, setChange}) =>
{

	const [image, setImage] = useState();

	useEffect(() =>
	{

		lib.getThumbnail(option.value).then((value) =>
		{
			setImage(value);
		});

	});

	const onClick = () =>
	{
		lib.userSelect((key) =>
		{
			if (key)
			{
				setChange(key);
			}
		});
	};

	return (
		<div>
			<div className={'input_image_margin'}>
				<H4>
					{option.title}
				</H4>
				<div
					onClick={onClick}
					className={'input_image_flex'}
				>
					{
						option.value && image ?
							<img src={image} />
							:
							<Button>
								Select an Image
							</Button>
					}
				</div>
			</div>
		</div>
	);
};

export default Image;