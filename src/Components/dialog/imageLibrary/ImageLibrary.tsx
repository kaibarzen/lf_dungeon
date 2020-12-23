import React, {SyntheticEvent, useRef} from 'react';
import {observer} from 'mobx-react-lite';
import store from '../../../dungeon/store';
import {Button, Modal} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import Image from './Image';

const ImageLibrary = observer(() =>
{

	const HTMLInput = useRef(null);

	const triggerUpload = () =>
	{
		if (HTMLInput.current !== null)
		{
			// @ts-ignore "ObJeCt Is PoSsIbLe NuLl"
			HTMLInput.current.click();
		}
	};

	// @ts-ignore
	const upload = (e: SyntheticEvent) =>
	{
		const target = e.target as HTMLInputElement;

		if (!target.files || target.files.length === 0)
		{
			return;
		}

		const reader = new FileReader();
		reader.addEventListener('load', event =>
		{
			if (event?.target?.result && typeof event.target.result === "string")
			{
				store.imageLibrary.addImage(event.target.result);
			}
		});
		reader.readAsDataURL(target.files[0]);
	};

	const closeModal = () =>
	{
		store.imageLibrary.closeDialog();
	};

	return (
		<Modal
			visible={store.imageLibrary.dialog}
			title='Image Library'
			width={1000}
			onCancel={closeModal}
			footer={[
				<Button onClick={closeModal}>
					Cancel
				</Button>,
				<Button
					icon={<UploadOutlined />}
					onClick={triggerUpload}
					type={'primary'}
				>Upload</Button>,
				<input
					type={'file'}
					hidden={true}
					ref={HTMLInput}
					onChange={upload}
				/>,
			]}
			className={"dialog"}
		>
			<div className={"library"}>
				{
					store.imageLibrary.keys.map((key, i) =>
					{
						return (
							<Image key={i} imageKey={key}/>
						);
					})
				}
			</div>
		</Modal>
	);
});

export default ImageLibrary;