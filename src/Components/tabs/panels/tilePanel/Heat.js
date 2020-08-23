import React from 'react';
import PropTypes from 'prop-types';
import {Button, EditableText, FormGroup, H2, HTMLSelect, InputGroup, NumericInput, Switch} from '@blueprintjs/core';
import {useSelector} from 'react-redux';
import redux from '../../../../redux/index';
import {IconNames} from '@blueprintjs/icons';
import HeatSub from './HeatSub';

const Heat = (props) =>
{

	const heat = useSelector(redux.editor.selectors.getHeat);

	const onSelectChange = (e) =>
	{
		redux.dispatch(redux.editor.actions.setHeatSelected({selected: e.target.value}));
	};

	const onCreateNew = (e) =>
	{
		redux.dispatch(redux.editor.actions.newHeat());
	};

	return (
		<div>
			<H2>
				Heat Settings
			</H2>

			<FormGroup
				helperText='Helper text with details...'
				label='Heat ID - Select'
			>
				<HTMLSelect
					value={heat.selected}
					onChange={onSelectChange}
					placeholder={'SELECT'}
				>
					<option value={0}> Select Heat ID</option>
					{
						Object.keys(heat.list).map((key, i) =>
						{
							const item = heat.list[key];
							return (
								<option
									key={i}
									value={item.id}
								>
									{item.display}
								</option>
							);
						})
					}
				</HTMLSelect>
				<Button onClick={onCreateNew}>
					Create new
				</Button>
			</FormGroup>

			<HeatSub />

		</div>
	);
};

Heat.defaultProps = {};

Heat.propTypes = {};

export default Heat;