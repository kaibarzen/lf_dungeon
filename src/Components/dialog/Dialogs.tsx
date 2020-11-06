import React from 'react';
import ImageLibrary from './imageLibrary/ImageLibrary';
import "./Dialog.sass"
import AddLayer from './addLayer/AddLayer';
import Resize from './resize/Resize';

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
			<Resize/>
		</div>
	);
};

export default Dialogs;