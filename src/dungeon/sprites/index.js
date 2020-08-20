import moon from './moon/moon';

export const register = [moon];

export const getSprites = () =>
{
	let out = {};
	for (const item of register)
	{
		const theme = item.id;
		for (const key in item.sprites)
		{
			const value = item.sprites[key]
			out[[theme, key].join("/")] = value;
		}
	}
	return out;
};