import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.dark.css';
import Structure from './Components/structure/Structure';
import Dialogs from './Components/dialog/Dialogs';
import ServiceWorker from './Components/ServiceWorker';

ReactDOM.render(
	<React.StrictMode>
		<Structure />
		<Dialogs />
		<ServiceWorker/>
	</React.StrictMode>,
	document.getElementById('root'),
);

console.log(`
  _      _      _
>(.)__ <(.)__ =(.)__
 (___/  (___/  (___/  Quack.
 
`);
