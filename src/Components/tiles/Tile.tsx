import React from 'react';
import store from '../../dungeon/store';
import {observer} from 'mobx-react-lite';

const Tile = observer((props: { id: string }) =>
{
	const sprite = store.sprite.getSprite(props.id);

	const selected = store.editor.selectedTile === props.id;

	if (!sprite)
	{
		return <div></div>;
	}

	const onClick = () =>
	{
		store.editor.selectedTile = props.id;
	};

	return (
		<div
			className={'tile'}
			onClick={onClick}
		>
			<div className={'container'}>
				<img
					alt={''}
					src={sprite.src}
					className={selected ? 'selected' : 'notselected'}
				/>
			</div>
		</div>
	);
});

export default Tile;