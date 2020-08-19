import React from 'react';
import {FormGroup, H1, H2, H3, InputGroup, NumericInput} from '@blueprintjs/core';
import {useSelector} from 'react-redux';
import redux from '../../../redux/index';
import {IconNames} from '@blueprintjs/icons';

const GridPanel = (props) =>
{
	const size = useSelector(redux.dungeon.selectors.getSize);

	const onChangeSize = (value, string, node) =>
	{
		redux.dispatch(redux.dungeon.actions.setSize({[node.name]: value}));
	};

	return (
		<div>
			<H2> Grid Settings</H2>

			<FormGroup
				helperText="Size is in Cells."
				label="Grid Size"
			>
				<div className={'editor_panel_input_horizontal'}>

					<NumericInput
						stepSize={1}
						onValueChange={onChangeSize}
						value={size.width}
						name={redux.dungeon.enums.size.WIDTH}
						min={0}
						max={255}
						leftIcon={IconNames.ARROWS_HORIZONTAL}
					/>

					<NumericInput
						stepSize={1}
						onValueChange={onChangeSize}
						value={size.height}
						name={redux.dungeon.enums.size.HEIGHT}
						min={0}
						max={255}
						leftIcon={IconNames.ARROWS_VERTICAL}
					/>
				</div>
			</FormGroup>

		</div>
	);
};

GridPanel.defaultProps = {};

GridPanel.propTypes = {};

export default GridPanel;