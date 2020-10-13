import React from 'react';
import {observer} from 'mobx-react-lite';
import store from '../../../dungeon/store';
import {Button, Classes, Dialog, FileInput} from '@blueprintjs/core';
import {IconNames} from '@blueprintjs/icons';
import Image from './Image';

const ImageLibrary = observer(({lib = store.imageLibrary}) =>
{
	const closeDialog = () =>
	{
		lib.closeDialog();
	};

	const onUpload = (e) =>
	{
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.addEventListener('load', event =>
		{
			lib.addImage(event.target.result);
		});
		if (file)
		{
			reader.readAsDataURL(file);
		}
	};

	// We need this helper functions here bcs of reference
	const onRemove = (key) =>
	{
		lib.removeImage(key);
	};

	const onSelect = (key) =>
	{
		lib.onSelect(key);
	};

	return (
		<Dialog
			isOpen={lib.dialog}
			className={`${Classes.DARK} lib_dialog`}
			onClose={closeDialog}
			title={'Image Library'}
			icon={IconNames.MEDIA}
		>
			<div className={Classes.DIALOG_BODY}>

				<div className={'lib_flexbox'}>
					{
						lib.keys.map((key, i) =>
						{
							return (
								<Image
									data={lib.getImage(key)}
									select={lib.select}
									onRemove={onRemove}
									onSelect={onSelect}
									imageKey={key}
									key={i}
								/>
							);
						})
					}
				</div>

				<div className={'lib_file_input'}>
					<FileInput
						text='Upload an Image'
						onInputChange={onUpload}
						fill={true}
					/>
				</div>

			</div>
			<div className={Classes.DIALOG_FOOTER}>
				<div className={Classes.DIALOG_FOOTER_ACTIONS}>
					<Button
						onClick={closeDialog}
					>
						Close
					</Button>
				</div>
			</div>
		</Dialog>
	);
});

export default ImageLibrary;