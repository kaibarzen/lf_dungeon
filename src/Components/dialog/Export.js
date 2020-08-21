import React, {useState} from 'react';
import {Button, FormGroup, H2, NumericInput} from '@blueprintjs/core';
import {Dialog, Classes, Intent} from '@blueprintjs/core';
import {IconNames} from '@blueprintjs/icons';
import redux from '../../redux';
import {useSelector} from 'react-redux';

const Export = (props) =>
{

	const dialog = useSelector(redux.editor.selectors.getDialog);
	const open = dialog === redux.editor.enums.dialog.EXPORT;

	// Use state without redux since we dont need it global
	const [overwrite, setOverwirte] = useState({});
	const size = useSelector(redux.dungeon.selectors.getSize);
	const data = {...size, ...overwrite};

	const onChange = (value, string, node) =>
	{
		setOverwirte({...overwrite, [node.name]: value});
	};

	const closeDialog = () =>
	{
		redux.dispatch(redux.editor.actions.closeDialog());
	};

	const onExport = () =>
	{
		redux.dispatch(redux.dungeon.actions.renderAs(data))
		closeDialog()
	};

	return (
		<Dialog
			isOpen={open}
			className={Classes.DARK}
			onClose={closeDialog}
			title={'Export'}
			icon={IconNames.EXPORT}
		>
			<div className={Classes.DIALOG_BODY}>

				<H2> Cell </H2>
				<FormGroup
					helperText='Size in Pixels'
					label='Cell Size'
				>
					<div className={'editor_panel_input_horizontal'}>
						<NumericInput
							stepSize={1}
							value={data.cellWidth}
							name={redux.dungeon.enums.size.CELL_WIDTH}
							min={0}
							leftIcon={IconNames.ARROWS_HORIZONTAL}
							onValueChange={onChange}
						/>

						<NumericInput
							stepSize={1}
							value={data.cellHeight}
							name={redux.dungeon.enums.size.CELL_HEIGHT}
							min={0}
							leftIcon={IconNames.ARROWS_VERTICAL}
							onValueChange={onChange}
						/>
					</div>
				</FormGroup>

				<H2>Exported Resolution</H2>
				<FormGroup
					helperText='Exported Image in Pixels'
				>
					<div className={'editor_panel_input_horizontal'}>
						<NumericInput
							value={data.cellWidth * data.width}
							leftIcon={IconNames.ARROWS_HORIZONTAL}
							disabled={true}
						/>

						<NumericInput
							value={data.cellHeight * data.height * 0.5}
							leftIcon={IconNames.ARROWS_VERTICAL}
							onValueChange={onChange}
							disabled={true}
						/>
					</div>
				</FormGroup>

			</div>
			<div className={Classes.DIALOG_FOOTER}>
				<div className={Classes.DIALOG_FOOTER_ACTIONS}>
					<Button
						onClick={closeDialog}
					>
						Cancel
					</Button>
					<Button
						intent={Intent.PRIMARY}
						onClick={onExport}
					>
						Export
					</Button>
				</div>
			</div>
		</Dialog>
	);
};

export default Export;