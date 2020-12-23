import React from 'react';
import ImageLibrary from './imageLibrary/ImageLibrary';
import "./Dialog.sass"
import AddLayer from './addLayer/AddLayer';
import Resize from './resize/Resize';
import IOManager from './ioManager/IOManager';

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
			<IOManager/>
		</div>
	);
};

export default Dialogs;