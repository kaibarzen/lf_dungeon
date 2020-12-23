import React from 'react';
import {Card} from 'antd';
import {allGroups} from '../../dungeon/sprites/all';
import Group from './Group';

const Groups = () =>
{

	return (
		<Card
			title={'Groups'}
			bordered={false}
			style={{width: 300}}
			className={'groups'}
		>
			<div className={"content"}>
				{
					allGroups.map((item, i) =>
					{
						return (<Group
							id={item.id}
							display={item.display}
							sliceDisplay={item.sliceDisplay}
							image={item.image}
							key={i}
						/>);
					})
				}
			</div>
		</Card>
	);
};

export default Groups;