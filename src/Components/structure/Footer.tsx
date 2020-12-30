import React from 'react';

const Footer = () =>
{
	return (
		<footer>
			<div className={"spacer"} />
			<div className={"content"}>
				<h4>v{process.env.REACT_APP_VERSION} WIP </h4>
			</div>
		</footer>
	);
};

export default Footer;