import {Button, Popconfirm} from 'antd';
import React, {useEffect, useState} from 'react';
import store from '../../../dungeon/store';
import {Preview} from '../../../dungeon/IOManager';

const Save = (props: { id: string }) =>
{
	const [preview, setPreview] = useState<Preview>();

	useEffect(() =>
	{

		// @ts-ignore
		store.iom.getPreview(props.id).then((value: Preview) =>
		{
			if (value)
			{
				setPreview(value);
			}
		});
	});

	const onLoad = () =>
	{
		store.iom.load(props.id);
	};

	const onDelete = () =>
	{
		store.iom.delete(props.id);
	};

	return (
		<div className={'save'}>

			<div>
				<div className={'container'}>
					<img
						src={preview?.thumbnail}
						alt={''}
					/>
				</div>
			</div>

			<div className={"buttoncontainer"}>
				<Popconfirm
					title={<div> Are you sure you want to delete the save? </div>}
					onConfirm={onDelete}
				>
					<Button
						danger={true}
						type={'primary'}
						className={"button"}
					>
						Remove
					</Button>
				</Popconfirm>

				<Popconfirm
					title={<div> Are you sure you want to load this save? Everything not saved will be lost. </div>}
					onConfirm={onLoad}
				>
					<Button
						type={'primary'}
						className={"button"}
					>
						Load
					</Button>
				</Popconfirm>
			</div>
		</div>
	);
};

export default Save;