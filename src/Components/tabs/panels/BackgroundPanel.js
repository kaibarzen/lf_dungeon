import React from 'react';
import {FileInput, FormGroup, H2, NumericInput, Switch} from '@blueprintjs/core';
import redux from '../../../redux/index';
import {IconNames} from '@blueprintjs/icons';
import {useSelector} from 'react-redux';

const BackgroundPanel = () =>
{

	const background = useSelector(redux.dungeon.selectors.getBackground);

	const onChangeBackgroundInput = (e) =>
	{
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.addEventListener('load', event =>
		{
			redux.dispatch(redux.dungeon.actions.setBackground({data: event.target.result}));
		});
		if (file)
		{
			reader.readAsDataURL(file);
		}
	};

	const onChangeBackground = (value, string, node) =>
	{
		redux.dispatch(redux.dungeon.actions.setBackground({[node.name]: value}));
	};

	const onChangeBackgroundSwitch = (e) =>
	{
		const name = e.target.name;
		const value = e.target.checked;
		redux.dispatch(redux.dungeon.actions.setBackground({[name]: value}));
	};

	return (
		<div className={'editor_panel'}>
			<H2>Background Settings</H2>

			<FormGroup
				label='Background Image'
			>
				<FileInput
					text='Choose file...'
					onInputChange={onChangeBackgroundInput}
					fill={true}
				/>
			</FormGroup>

			<div className={'editor_panel_input_horizontal'}>
				<FormGroup
					label='Background Opacity'
				>
					<NumericInput
						stepSize={1}
						onValueChange={onChangeBackground}
						value={background.opacity}
						name={redux.dungeon.enums.background.OPACITY}
						min={0}
						max={100}
						leftIcon={IconNames.PERCENTAGE}
					/>
				</FormGroup>
				<div>

				</div>
			</div>

			<div className={'editor_panel_input_horizontal'}>
				<FormGroup
					label='Background Enabled'
				>
					<Switch
						checked={background.enabled}
						label={background.enabled ? 'Enabled' : 'Disabled'}
						onChange={onChangeBackgroundSwitch}
						name={redux.dungeon.enums.background.ENABLED}
					/>
				</FormGroup>

				<FormGroup
					label='Background Repeat'
				>
					<Switch
						checked={background.repeat}
						label={background.repeat ? 'Repeat' : 'No-Repeat'}
						onChange={onChangeBackgroundSwitch}
						name={redux.dungeon.enums.background.REPEAT}
					/>
				</FormGroup>

			</div>

		</div>
	);
};

export default BackgroundPanel;