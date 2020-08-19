import React from 'react';
import {Callout, FormGroup, H1, H2, H3, InputGroup, Intent, NumericInput, Switch} from '@blueprintjs/core';
import {useSelector} from 'react-redux';
import redux from '../../../redux/index';
import {IconNames} from '@blueprintjs/icons';

const GridPanel = (props) =>
{
	const size = useSelector(redux.dungeon.selectors.getSize);
	const grid = useSelector(redux.dungeon.selectors.getGrid);

	const onChangeSize = (value, string, node) =>
	{
		redux.dispatch(redux.dungeon.actions.setSize({[node.name]: value}));
	};

	const onChangeGrid = (value, string, node) =>
	{
		redux.dispatch(redux.dungeon.actions.setGrid({[node.name]: value}))
	};

	const onChangeGridSwitch = (e) =>
	{
		const name = e.target.name;
		const value = e.target.checked;
		redux.dispatch(redux.dungeon.actions.setGrid({[name]: value}))
	};

	return (
		<div className={"editor_panel"}>
			<H2> Grid Settings</H2>

			<FormGroup
				helperText='Size in Cells'
				label='Grid Size'
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

			<div className={'editor_panel_input_horizontal'}>
				<FormGroup
					label='Grid Enabled'
				>
					<Switch
						checked={grid.enabled}
						label={grid.enabled ? 'Enabled' : 'Disabled'}
						onChange={onChangeGridSwitch}
						name={redux.dungeon.enums.grid.ENABLED}
					/>
				</FormGroup>
				<FormGroup
					label='Grid Opacity'
				>
					<NumericInput
						stepSize={1}
						onValueChange={onChangeGrid}
						value={grid.opacity}
						name={redux.dungeon.enums.grid.OPACITY}
						min={0}
						max={100}
						leftIcon={IconNames.PERCENTAGE}
					/>
				</FormGroup>
			</div>

			<H2> Cell Settings</H2>

			<FormGroup
				helperText="Size in Pixels"
				label='Cell Size'
			>
				<div className={'editor_panel_input_horizontal'}>
					<NumericInput
						stepSize={1}
						onValueChange={onChangeSize}
						value={size.cellWidth}
						name={redux.dungeon.enums.size.CELL_WIDTH}
						min={0}
						leftIcon={IconNames.ARROWS_HORIZONTAL}
					/>

					<NumericInput
						stepSize={1}
						onValueChange={onChangeSize}
						value={size.cellHeight}
						name={redux.dungeon.enums.size.CELL_HEIGHT}
						min={0}
						leftIcon={IconNames.ARROWS_VERTICAL}
					/>
				</div>
			</FormGroup>

			<Callout
				title={'Cell Width & Height'}
				intent={Intent.WARNING}
			>
				Cell Width and Height can be separately changed at the export.
			</Callout>

		</div>
	);
};

GridPanel.defaultProps = {};

GridPanel.propTypes = {};

export default GridPanel;