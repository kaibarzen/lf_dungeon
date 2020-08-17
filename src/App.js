import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Editor from './Components/Editor';

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
		<div className='App bp3-dark'>
			<Editor />
		</div>
	);
}

export default App;
