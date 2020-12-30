import {DeleteOutlined} from '@ant-design/icons';
import {Button, Popconfirm, Typography} from 'antd';
import React from 'react';
import {optionConstructorItem} from '../../../dungeon/layer/Layer';

const Default = (props: { option: optionConstructorItem, setChange: Function, removeLayer: Function }) =>
{
	return (
		<div className={'name'}>
			<div>
				<Typography.Title
					level={3}
					// @ts-ignore
					editable={{maxLength: 16, onChange: props.setChange}}
				>
					{props.option.value}
				</Typography.Title>
			</div>
			<div className={'delete'}>
				<Popconfirm
					title={<div>Confirm Action</div>}
					okText={"Delete"}
					icon={<DeleteOutlined />}
					onConfirm={() =>
					{
						props.removeLayer();
					}}
				>
					<Button
						type={'text'}
					>
						<Typography.Title level={4}>
							<DeleteOutlined />
						</Typography.Title>
					</Button>
				</Popconfirm>
			</div>
		</div>
	);
};

export default Default;