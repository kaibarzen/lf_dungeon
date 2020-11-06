import { DownloadOutlined } from '@ant-design/icons';
import {Button, Divider, Layout, Typography } from 'antd';
import React from 'react';
import logo from "./../../resources/img/lunar.png"
import store from '../../dungeon/store';

const { Title } = Typography;

const Header = () =>
{
	return (
		<Layout.Header className="header">
			<img src={logo} alt={"LOGO"} />
			<h2> DUNGEON </h2>

			<div className={"actions"}>
				<Button type={"text"} size={"large"} onClick={store.dungeon.download.bind(store.dungeon)}>
					Download <DownloadOutlined />
				</Button>
			</div>
		</Layout.Header>
	);
};

export default Header;