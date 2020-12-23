import React from 'react';
import {observer} from 'mobx-react-lite';
import store from '../../dungeon/store';

const Canvas = observer(() =>
{
	return (
		<div className='canvas'>
			<div className={'border'}>
				<div className={'normal'}>
					<canvas
						ref={(ref) =>
						{
							if (ref)
							{
								store.dungeon.setCanvas(ref);
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
});

export default Canvas;