import React from 'react';
import Editor from './Components/Editor';
import {Classes} from '@blueprintjs/core';

function App(props)
{

	/*
	 const test = useSelector((state) => {
	 return state.test.test;
	 console.log("WHOLdE STATE", state)
	 })

	 const dispatch = useDispatch()
	 */

	return (
		<div className={Classes.DARK}>
			<Editor />
		</div>
	);
}

export default App;
