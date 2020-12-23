import {Layout} from 'antd';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Canvas from './Canvas';
import Sidebar from './Sidebar';
import Tilebar from './Tilebar';
import './Structure.sass';

const {Content} = Layout;

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