import React from 'react';
import store from '../../dungeon/store';
import {observer} from 'mobx-react-lite';
import {Tooltip} from 'antd';

interface Props
{
	id: string,
	display: string,
	sliceDisplay: string,
	image: string,
}

const Group = observer((props: Props) =>
{

	const selected = store.editor.selectedGroups.includes(props.id);

	const onClick = () =>
	{
		store.editor.toggleGroup(props.id);
	};

	return (
		<div
			className={'group'}
			onClick={onClick}
		>
			<Tooltip title={`${props.sliceDisplay} - ${props.display}`} placement={"top"}>
				<div className={'container'}>
					<img
						alt={''}
						src={props.image}
						className={selected ? 'selected' : 'notselected'}
					/>
				</div>
			</Tooltip>
		</div>
	);
});

export default Group;