import React from 'react';
import {Layout} from 'antd';
import {observer} from 'mobx-react-lite';
import store from '../../dungeon/store';

const {Content, Sider} = Layout;

const Canvas = observer(() =>
{
	return (
		<Layout>
			<Content>
				<div className='canvas'>
					<div className={"border"}>
						<div className={"normal"}>
							<canvas
								ref={(ref) =>
								{
									if(ref){
										store.dungeon.setCanvas(ref)
									}
								}}
							/>
						</div>
					</div>
				</div>
			</Content>
		</Layout>
	);
});

export default Canvas;