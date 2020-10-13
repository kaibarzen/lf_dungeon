import React from 'react';
import Export from './dialog/Export';
import ImageLibrary from './dialog/ImageLibrary/ImageLibrary';

const DialogManager = () =>
{
	return (
		<div>
			<Export/>
			<ImageLibrary/>
		</div>
	);
};

export default DialogManager;