import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.dark.css";

// @ts-ignore
import * as serviceWorker from './serviceWorker';
import Structure from './Components/structure/Structure';
import Dialogs from './Components/dialog/Dialogs';

ReactDOM.render(
	<React.StrictMode>
		<Structure/>
		<Dialogs/>
	</React.StrictMode>,
	document.getElementById('root'),
);

serviceWorker.unregister();
