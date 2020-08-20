import React from 'react';
import {Button, Icon, IconName, Menu, MenuItem, Navbar, Popover, Position} from '@blueprintjs/core';
import {IconNames} from '@blueprintjs/icons';
import lunar from '../resources/img/lunar.png';
import redux from '../redux/index';

const Navigation = (props) =>
{

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
					<Button
						icon={IconNames.BUILD}
						minimal
					>
						Sprites
					</Button>
					<Navbar.Divider />
				</Navbar.Group>

				<Navbar.Group>
					<Popover
						content={
							<Menu>
								<Menu.Divider title={'Settings'} />
								<MenuItem
									text='Grid'
									icon={'grid'}
									onClick={() =>
									{
										redux.dispatch(redux.editor.actions.setDialog({open: true, type: redux.editor.dialog.types.GRID}))
									}}
								/>
							</Menu>
						}
						position={Position.BOTTOM_LEFT}
					>
						<Button
							icon={IconNames.DOCUMENT}
							minimal
						>
							Document...
						</Button>
					</Popover>

					<Popover
						content={
							<Menu>
								<MenuItem icon={IconNames.FAST_FORWARD} text='Quick-Export' />
								<MenuItem icon={IconNames.EXPORT} text='Export' />
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