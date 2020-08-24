import React from 'react';
import {Button, Menu, MenuItem, Navbar, Popover, Position} from '@blueprintjs/core';
import {IconNames} from '@blueprintjs/icons';
import lunar from '../resources/img/lunar.png';
import redux from '../redux/index';

const Navigation = (props) =>
{

	const renderHere = () =>
	{
		redux.dispatch(redux.dungeon.actions.renderHere());
	};

	const openDialog = (type) =>
	{
		redux.dispatch(redux.editor.actions.setDialog({
			type,
		}));
	};

	return (
		<div>
			<Navbar>
				<Navbar.Group>
					<img
						src={lunar}
						alt={'Logo'}
						className={'ld_logo'}
					/>
					<Navbar.Heading>Dungeon</Navbar.Heading>
					<Navbar.Divider />
				</Navbar.Group>

				<Navbar.Group>
					<Popover
						content={
							<Menu>
								<MenuItem
									icon={IconNames.FAST_FORWARD}
									text='Quick-Export'
									onClick={renderHere}
								/>
								<MenuItem
									icon={IconNames.EXPORT}
									text='Export'
									onClick={() =>
									{
										openDialog(redux.editor.enums.dialog.EXPORT)
									}}
								/>
							</Menu>
						}
						position={Position.BOTTOM_LEFT}
					>
						<Button
							icon={IconNames.EXPORT}
							minimal
						>
							Export...
						</Button>
					</Popover>

				</Navbar.Group>
			</Navbar>
		</div>
	);
};

Navigation.defaultProps = {};

Navigation.propTypes = {};

export default Navigation;