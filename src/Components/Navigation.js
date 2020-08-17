import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon, Menu, MenuItem, Navbar, Popover, Position} from '@blueprintjs/core';
import {IconNames} from '@blueprintjs/icons';

import lunar from '../resources/img/lunar.png';

import {Classes} from '@blueprintjs/core';

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
						icon={'document'}
						minimal
					>
						Document
					</Button>

					<Menu>
						<MenuItem text='Submenu'>
							<MenuItem text='Child one' />
							<MenuItem text='Child two' />
							<MenuItem text='Child three' />
						</MenuItem>
					</Menu>

					<Popover
						content={
							<Menu>
								<MenuItem text='Child one' />
								<MenuItem text='Child two' />
								<Menu.Divider title={'Header'}></Menu.Divider>
								<MenuItem text='Child three' />
							</Menu>
						}
						position={Position.RIGHT_BOTTOM}
					>
						<Button
							icon={'export'}
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