import React from 'react';
import packageJson from "../../package.alias.json"

const Footer = () =>
{
	return (
		<footer>
			<div className={"spacer"} />
			<div className={"content"}>
				<h4>v{packageJson.version} WIP </h4>
			</div>
		</footer>
	);
};

export default Footer;