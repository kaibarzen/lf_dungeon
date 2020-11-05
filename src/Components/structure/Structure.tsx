import {Layout} from 'antd';
import React from 'react';
import Header from './Header';

import './Structure.sass';
import Footer from './Footer';
import Canvas from './Canvas';
import Sidebar from './Sidebar';

const Structure = () =>
{
	return (
		<Layout className={'structure'}>
			<Header />
			<Layout className={"content"}>
				<Sidebar/>
				<Canvas />
			</Layout>
			<Footer />
		</Layout>
	);
};

export default Structure;