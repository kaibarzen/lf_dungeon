import {Layout} from 'antd';
import React from 'react';
import Header from './Header';

import './Structure.sass';
import Footer from './Footer';
import Canvas from './Canvas';
import Sidebar from './Sidebar';
import Tilebar from './Tilebar';

const {Content, Sider} = Layout;

const Structure = () =>
{
	return (
		<Layout className={'structure'}>
			<Header />
			<Layout className={'content'}>
				<Sidebar />
				<Layout>
					<Content className={"contenttwo"}>
						<Canvas/>
						<Tilebar/>
					</Content>
				</Layout>
			</Layout>
			<Footer />
		</Layout>
	);
};

export default Structure;