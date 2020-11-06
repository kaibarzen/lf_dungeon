import React, {useState} from 'react';
import store from '../../../dungeon/store';
import {Divider, Form, Modal} from 'antd';
import {observer} from 'mobx-react-lite';
import Input from './Input';

const Resize = observer(() =>
{

	const [over, setOver] = useState({});
	const merged = {...store.dungeon.getSize(), ...over};

	const close = () =>
	{
		setOver({});
		store.editor.resizeModal = false;
	};

	const onChange = (obj: object) =>
	{
		setOver({...over, ...obj});
	};

	const apply = () =>
	{
		store.dungeon.setSize(over)
		store.editor.resizeModal = false;
		setOver({})
	};

	return (
		<Modal
			visible={store.editor.resizeModal}
			title='Resize'
			onCancel={close}
			onOk={apply}
			okText={'Apply'}
			className={'resize'}
		>

			<Form labelCol={{span:8}} wrapperCol={{span: 16}}>
				<Divider orientation='left'>Grid Size</Divider>
				<Input passDown={{min: 1}} name={"width"} label={"Width (cells)"} onChange={onChange} value={merged.width}/>
				<Input passDown={{min: 1}} name={"height"} label={"Height (cells)"} onChange={onChange} value={merged.height}/>

				<Divider orientation='left'>Cell Size</Divider>
				<Input passDown={{min: 1, max: 255}} name={"cellWidth"} label={"Width (px)"} onChange={onChange} value={merged.cellWidth}/>
				<Input passDown={{min: 1, max: 255}} name={"cellHeight"} label={"Height (px)"} onChange={onChange} value={merged.cellHeight}/>

				<Divider orientation='left'>Canvas Size (Output Size)</Divider>
				<Input passDown={{disabled: true}} name={""} label={"Width (px)"} onChange={onChange} value={merged.cellWidth * merged.width}/>
				<Input passDown={{disabled: true}} name={""} label={"Height (px)"} onChange={onChange} value={merged.cellHeight * merged.height * 0.5}/>
			</Form>

		</Modal>
	);
});

export default Resize;