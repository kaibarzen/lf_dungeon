import React from 'react';
import {Dialog, Classes, Card} from '@blueprintjs/core';
import {useSelector} from 'react-redux';
import redux from '../../redux/index';

const SettingsDialog = (props) =>
{
	const dialog = useSelector(redux.editor.selectors.getDialog);

	const closeDialog = () =>
	{
		redux.dispatch(redux.editor.actions.setDialog({open: false, type: redux.editor.dialog.types.GRID}))
	};

	return (
		<Dialog
			isOpen={dialog.open}
			className={Classes.DARK}
			onClose={closeDialog}
		>
			<div className={Classes.DIALOG_BODY}>
				test
			</div>
		</Dialog>
	);
};

SettingsDialog.defaultProps = {};

export default SettingsDialog;