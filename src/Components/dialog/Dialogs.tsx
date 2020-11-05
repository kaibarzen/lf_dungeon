import React from 'react';
import ImageLibrary from './imageLibrary/ImageLibrary';
import "./Dialog.sass"
import AddLayer from './addLayer/AddLayer';

/**
 * Collection of all Dialogs
 * @constructor
 */
const Dialogs = () =>
{
	return (
		<div>
			<ImageLibrary/>
			<AddLayer/>
		</div>
	);
};

export default Dialogs;