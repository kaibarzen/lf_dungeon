import { Button } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.dark.css";

// @ts-ignore
import * as serviceWorker from './serviceWorker';
import Structure from './Components/structure/Structure';

ReactDOM.render(
	<React.StrictMode>
		<Structure/>
	</React.StrictMode>,
	document.getElementById('root'),
);

serviceWorker.unregister();
