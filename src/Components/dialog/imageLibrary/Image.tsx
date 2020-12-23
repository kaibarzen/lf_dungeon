import {Button, Popconfirm} from 'antd';
import React, {useEffect, useState} from 'react';
import store from '../../../dungeon/store';

const Image = (props: { imageKey: string }) =>
{
	const [image, setImage] = useState<string>();

	useEffect(() =>
	{
		store.imageLibrary.getImage(props.imageKey).then((value) =>
		{
			if (value)
			{
				setImage(value);
			}
		});
	});

	const onClick = () =>
	{
		if (store.imageLibrary.select)
		{
			store.imageLibrary.onSelect(props.imageKey);
		}
	};

	const onDelete = () =>
	{
		store.imageLibrary.removeImage(props.imageKey)
	};

	return (
		<div className={"image"}>
			<div
				className={store.imageLibrary.select ? 'selectable' : 'notselectable'}
				onClick={onClick}
			>
				<div className={'container'}>
					<img
						src={image}
						alt={''}
					/>
				</div>
			</div>

			<Popconfirm
				title={<div> Are you sure you want to remove this image?  <br /> Layers won't be able to use it anymore. </div>}
				onConfirm={onDelete}
			>
				<Button danger={true} type={"primary"} className={"button"}>
					Remove
				</Button>
			</Popconfirm>
		</div>
	);
};

export default Image;