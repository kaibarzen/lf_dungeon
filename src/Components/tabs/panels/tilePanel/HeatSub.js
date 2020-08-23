import React from 'react';
import PropTypes from 'prop-types';
import {FileInput, FormGroup, InputGroup, NumericInput, Switch} from '@blueprintjs/core';
import redux from '../../../../redux';
import {IconNames} from '@blueprintjs/icons';
import {useSelector} from 'react-redux';

const HeatSub = (props) =>
{

	const heat = useSelector(redux.editor.selectors.getHeat);
	const selected = heat.list[heat.selected]; // May be undefined

	const onValueChange = (key, value) =>
	{
		redux.dispatch(redux.editor.actions.setHeat({[key]: value, id: heat.selected}));
		if (key === 'display')
		{
			return;
		}
		redux.dispatch(redux.dungeon.actions.setHeatCanvas({[key]: value, id: heat.selected}));
	};

	const onChangeSwitch = (e) =>
	{
		const name = e.target.name;
		const value = e.target.checked;
		onValueChange(name, value);
	};

	const onChangeFile = (e) =>
	{
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.addEventListener('load', event =>
		{
			redux.dispatch(redux.dungeon.actions.setHeatCanvas({data: event.target.result, id: heat.selected}));
		});
		if (file)
		{
			reader.readAsDataURL(file);
		}
	};

	if (!selected)
	{
		return <div></div>;
	}

	return (
		<div>
			<div className={'editor_panel_input_horizontal'}>
				<FormGroup
					label='ID'
				>
					<InputGroup
						onChange={(e) =>
						{
							onValueChange('display', e.target.value);
						}}
						value={selected.display}
					/>
				</FormGroup>
				<div>
				</div>
			</div>

			<FormGroup
				label='Background Image'
			>
				<FileInput
					text='Choose image...'
					onInputChange={onChangeFile}
					fill={true}
				/>
			</FormGroup>

			<div className={'editor_panel_input_horizontal'}>
				<FormGroup
					label='Background Opacity'
				>
					<NumericInput
						stepSize={1}
						onValueChange={(value) =>
						{
							onValueChange('opacity', value / 100);
						}}
						value={selected.opacity * 100}
						min={0}
						max={100}
						leftIcon={IconNames.PERCENTAGE}
					/>
				</FormGroup>
				<FormGroup
					label='Background Repeat'
				>
					<Switch
						checked={selected.repeat}
						label={selected.repeat ? 'Repeat' : 'No-Repeat'}
						onChange={onChangeSwitch}
						name={redux.dungeon.enums.background.REPEAT}
					/>
				</FormGroup>
			</div>
		</div>
	);
};

HeatSub.defaultProps = {};

HeatSub.propTypes = {};

export default HeatSub;