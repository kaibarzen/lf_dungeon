import React from 'react';
import ReactDOM from 'react-dom';
import './resources/sass/index.sass';
import App from './App';
import * as serviceWorker from './serviceWorker';

import redux from './redux/index';
import {Provider} from 'react-redux';

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={redux.store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

window.redux = redux;
// window.store.dispatch(window.testSlice.actions.set("JA"))

serviceWorker.unregister();
