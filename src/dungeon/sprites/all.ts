import {slice as moonslice} from './moon/index';

export const register = [moonslice]; // Sprites get all registeres by SpriteLoader, only groups get grouped here for the ui

export interface Group
{
	id: string,
	display: string,
	sliceDisplay: string,
	data: string[],
	image: string,
}

/**
 * Returns all groups from all slices, gives them ids and fixes the data array
 */
const getGroups = (): Group[] =>
{
	let out: Group[] = [];
	for (const slice of register)
	{
		let groupCounter = 0;

		for (const group of slice.groups)
		{
			let data = [];
			for (const item of group.data)
			{
				data.push([slice.id, item].join('/'));
			}

			const newGroup: Group = {
				id: [slice.id, groupCounter].join('/'),
				display: group.display,
				sliceDisplay: slice.display,
				data,
				image: group.image,
			};
			out.push(newGroup);
			groupCounter++;
		}

	}
	return out;
};

export const allGroups = getGroups();