import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react-lite';
import store from '../../../store';
import {toJS} from 'mobx';
import {input} from '../../../dungeon/layer/Layer';
import Name from '../../layer/input/Name';

// @ts-ignore
const LayerOptions = observer(({dungeon = store.dungeon}) =>
{

	const layer = dungeon.selectedLayer;
	if (!layer)
	{
		return;
	}
	const opt = layer.getOptions();

	/**
	 * Forward an change to the layer
	 * @param forward object
	 */
	const setChange = (forward) =>
	{
		layer.setOptions(forward)
	};

	const returnOption = (option) =>
	{
		switch (option.type)
		{
			case input.NAME:
				return <Name option={option} setChange={setChange}/>;
			default:
				return <div></div>;
		}
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