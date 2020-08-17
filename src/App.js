import React from 'react';
import {Button} from '@blueprintjs/core';
import {useDispatch, useSelector} from 'react-redux';
import Navigation from './Components/Navigation';

function App(props)
{

	const test = useSelector((state) => {
		return state.test.test;
		console.log("WHOLE STATE", state)
	})

	const dispatch = useDispatch()

	return (
		<div className='App bp3-dark'>
			<Navigation/>
			<header className='App-header'>
				<Button icon='refresh' />
				{test}
			</header>
		</div>
	);
}

export default App;
