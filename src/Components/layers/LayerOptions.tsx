import React from 'react';
import {observer} from 'mobx-react-lite';
import store from '../../dungeon/store';
import {Card} from 'antd';
import {input, optionConstructorItem} from '../../dungeon/layer/Layer';
import Checkbox from './input/Checkbox';
import Default from './input/Default';
import Percent from './input/Percent';
import Color from './input/Color';
import Number from './input/Number';
import Select from './input/Select';
import Switch from './input/Switch';
import Image from './input/Image';
import './Layers.sass';
// @ts-ignore
const LayerOptions = observer(() =>
{
	const layer = store.dungeon.selectedLayer;
	if (!layer)
	{
		return;
	}

	const opt = layer.getOptions();

	const returnOption = (option: optionConstructorItem): React.ReactNode =>
	{
		const setChange = (value: any) =>
		{
			// @ts-ignore
			layer.setOptions({[option.key]: value});
		};

		const removeLayer = () =>
		{
			store.dungeon.removeLayer(layer.id)
		};

		switch (option.type)
		{
			case input.DEFAULT:
				return <Default
					option={option}
					setChange={setChange}
					removeLayer={removeLayer}
				/>;
			case input.CHECKBOX:
				return <Checkbox
					option={option}
					setChange={setChange}
				/>;
			case input.PERCENT:
				return <Percent
					option={option}
					setChange={setChange}
				/>;
			case input.COLOR:
				return <Color
					option={option}
					setChange={setChange}
				/>;
			case input.NUMBER:
				return <Number
					option={option}
					setChange={setChange}
				/>;
			case input.SELECT:
				return <Select
					option={option}
					setChange={setChange}
				/>;
			case input.SWITCH:
				return <Switch
					option={option}
					setChange={setChange}
				/>;
			case input.IMAGE:
				return <Image
					option={option}
					setChange={setChange}
				/>;
			default:
				return <div></div>;
		}
	};

	return (
		<Card
			title={'Layer Options'}
			bordered={false}
			style={{width: 300}}
			className={'layeropt'}
		>
			{opt.map((option, i) =>
			{
				return (
					<div key={i} className={"preinput"}>
						{returnOption(option)}
					</div>
				);
			})
			}
		</Card>
	);

});

export default LayerOptions;