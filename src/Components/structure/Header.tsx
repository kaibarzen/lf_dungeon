import { Layout, Typography } from 'antd';
import React from 'react';
import logo from "./../../resources/img/lunar.png"

const { Title } = Typography;

const Header = () =>
{
	return (
		<Layout.Header className="header">
			<img src={logo} alt={"LOGO"} />
			<h2> DUNGEON </h2>
		</Layout.Header>
	);
};

export default Header;