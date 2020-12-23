import React, {useEffect, useState} from 'react';
import {imageLibrary as lib} from '../../../dungeon/store';
import {optionConstructorItem} from '../../../dungeon/layer/Layer';
import {Button} from 'antd';

const Image = (props: { option: optionConstructorItem, setChange: Function }) =>
{

	const [image, setImage] = useState();

	useEffect(() =>
	{

		lib.getThumbnail(props.option.value).then((value) =>
		{
			// @ts-ignore
			setImage(value);
		});

	});

	const onClick = () =>
	{
		lib.userSelect((key: string) =>
		{
			if (key)
			{
				props.setChange(key);
			}
		});
	};

	return (
		<div className={'image'}>
			<div className={'input'}>
				<h3>
					{props.option.title}
				</h3>
				<div
					onClick={onClick}
					className={'container'}
				>
					{
						props.option.value && image ?
							<img
								src={image}
								alt={''}
							/>
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