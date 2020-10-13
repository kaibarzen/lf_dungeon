import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react-lite';
import store from '../../../dungeon/store';
import {toJS} from 'mobx';
import {input} from '../../../dungeon/layer/Layer';
import Name from '../../layer/input/Name';
import Checkbox from '../../layer/input/Checkbox';
import Color from '../../layer/input/Color';
import Percent from '../../layer/input/Percent';
import Number from '../../layer/input/Number';
import Select from '../../layer/input/Select';

// @ts-ignore
const LayerOptions = observer(({dungeon = store.dungeon}) =>
{

	const layer = dungeon.selectedLayer;
	if (!layer)
	{
		return;
	}
	const opt = layer.getOptions();

	const returnOption = (option) =>
	{
		const setChange = (value) =>
		{
			layer.setOptions({[option.key]: value});
		};

		switch (option.type)
		{
			case input.NAME:
				return <Name
					option={option}
					setChange={setChange}
				/>;
			case input.CHECKBOX:
				return <Checkbox
					option={option}
					setChange={setChange}
				/>;
			case input.COLOR:
				return <Color
					option={option}
					setChange={setChange}
				/>;
			case input.PERCENT:
				return <Percent
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
			default:
				return <div></div>;
		}
	};

	const getInput = (type) =>
	{

	};

	return (
		<div>
			{opt.map((option, i) =>
			{
				return (
					<div key={i}>
						{returnOption(option)}
					</div>
				);
			})
			}
		</div>
	);

});

export default LayerOptions;