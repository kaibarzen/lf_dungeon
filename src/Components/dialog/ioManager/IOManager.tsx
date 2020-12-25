import React from 'react';
import {observer} from 'mobx-react-lite';
import store from '../../../dungeon/store';
import {Button, Modal} from 'antd';
import Save from './Save';

const IOManager = observer(() =>
{

	const closeModal = () =>
	{
		store.iom.dialog = false;
	};

	const onNew = () =>
	{
		store.iom.save(Date.now().toString(16))
	};

	return (
		<Modal
			visible={store.iom.dialog}
			title='Save & Load'
			width={1000}
			onCancel={closeModal}
			footer={[
				<Button onClick={closeModal}>
					Close
				</Button>,
				<Button
					onClick={onNew}
					type={'primary'}
				>Save as new</Button>,
			]}
			className={'dialog iom'}
		>
			<div className={'container'}>
				{
					store.iom.keys.map((key, i) =>
					{
						return (
							<Save
								key={key}
								id={key}
							/>
						);
					})
				}
			</div>
		</Modal>
	);
});

export default IOManager;