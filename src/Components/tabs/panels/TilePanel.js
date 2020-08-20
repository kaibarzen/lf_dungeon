import React from 'react';
import PropTypes from 'prop-types';
import {H2} from '@blueprintjs/core';

const TilePanel = (props) =>
{
	return (
		<div className={"editor_panel"}>
			<H2>Tiles</H2>
		</div>
	);
};

TilePanel.defaultProps = {};

TilePanel.propTypes = {};

export default TilePanel;