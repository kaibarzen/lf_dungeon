import {Layout} from 'antd';
import React from 'react';
import Header from './Header';

import './Structure.sass';
import Footer from './Footer';
import Canvas from './Canvas';

const {Content, Sider} = Layout;

const Structure = () =>
{
	return (
		<Layout className={"structure"}>
			<Header />
			<Layout>
				<Sider>
					MENU SPACE
				</Sider>
				<Canvas/>
			</Layout>
			<Footer/>
		</Layout>
	);
};

export default Structure;