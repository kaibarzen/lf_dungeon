import React from 'react';
import {Button, ButtonGroup, H2, Intent} from '@blueprintjs/core';
import {IconNames} from '@blueprintjs/icons';
import redux from '../../../../redux';
import {useSelector} from 'react-redux';

const Tools = () =>
{
	const activeTool = useSelector(redux.editor.selectors.getSpritesTool);

	const onChangeTool = (tool) =>
	{
		redux.dispatch(redux.editor.actions.setSpritesTool({tool}));
	};


	return (
		<div>
			<H2>Tools</H2>

			<ButtonGroup fill={true}>
				<Button
					icon={IconNames.CUBE_ADD}
					intent={Intent.SUCCESS}
					text={'Single'}
					name={redux.editor.enums.sprites.tools.SINGLE}
					disabled={redux.editor.enums.sprites.tools.SINGLE === activeTool}
					onClick={() =>
					{
						onChangeTool(redux.editor.enums.sprites.tools.SINGLE); // Otherwise Bugged
					}}
				/>
				<Button
					icon={IconNames.SEGMENTED_CONTROL}
					intent={Intent.SUCCESS}
					text={'Heat'}
					name={redux.editor.enums.sprites.tools.HEAT}
					disabled={redux.editor.enums.sprites.tools.HEAT === activeTool}
					onClick={() =>
					{
						onChangeTool(redux.editor.enums.sprites.tools.HEAT); // Otherwise Bugged
					}}
				/>
				<Button
					icon={IconNames.CUBE_REMOVE}
					intent={Intent.DANGER}
					text={'Remove'}
					name={redux.editor.enums.sprites.tools.REMOVE}
					disabled={redux.editor.enums.sprites.tools.REMOVE === activeTool}
					onClick={() =>
					{
						onChangeTool(redux.editor.enums.sprites.tools.REMOVE); // Otherwise Bugged
					}}
				/>
			</ButtonGroup>
		</div>
	);
};

export default Tools;