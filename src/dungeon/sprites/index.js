import moon from './moon/moon';
import heat from "./heat/heat"

export const register = {moon, heat};

export const getSprites = () =>
{
	let out = {};
	for (const key1 in register)
	{
		const item = register[key1];
		const theme = item.id;
		for (const key in item.sprites)
		{
			const value = item.sprites[key]
			out[[theme, key].join("/")] = value;
		}
	}
	return out;
};