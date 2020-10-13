import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup, Card, H5, IconName, Intent, Popover} from '@blueprintjs/core';
import {IconNames} from '@blueprintjs/icons';
import * as Classes from '@blueprintjs/core/lib/cjs/common/classes';

// data is a promise! with dataurl
const Image = ({data, imageKey, onSelect, onRemove, select}) =>
{

	const [image, setImage] = useState();

	useEffect(() =>
	{
		data.then((value) =>
		{
			setImage(value);
		});
	});

	const deletePopover = (<Card>
			<H5>Confirm removal</H5>
			<p>Are you sure you want to remove this image?  <br /> Layers won't be able to use it anymore.</p>
			<div className={"lib_file_remove"}>
				<Button
					className={`${Classes.POPOVER_DISMISS} lib_file_remove_no_hugging`}
				>
					Cancel
				</Button>
				<Button
					className={Classes.POPOVER_DISMISS}
					intent={Intent.DANGER}
					onClick={() => {
						onRemove(imageKey)
					}}
				>
					Remove
				</Button>
			</div>
		</Card>);

	return (
		<div>
			<Card
				interactive={true}
				elevation={0}
				className={'lib_card'}
			>
				<div className={'div_img_container'}>
					<img src={image} />
				</div>
				<ButtonGroup
					fill={true}
					minimal={true}
				>
					<Popover
						content={deletePopover}
					>
						<Button
							icon={IconNames.DELETE}
							intent={Intent.DANGER}
						>
							Remove
						</Button>
					</Popover>
					<Button
						icon={IconNames.SELECT}
						intent={Intent.SUCCESS}
						disabled={!select}
						onClick={() => {
							onSelect(imageKey)
						}}
					>
						Select
					</Button>
				</ButtonGroup>
			</Card>
		</div>
	);
};

Image.defaultProps = {};

Image.propTypes = {};

export default Image;