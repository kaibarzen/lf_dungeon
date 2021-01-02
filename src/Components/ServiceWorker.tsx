import React, {useEffect} from 'react';
import {notification} from 'antd';
// @ts-ignore
import * as serviceWorker from '../serviceWorker';

const ServiceWorker = () =>
{
	const onUpdate = (reg: ServiceWorkerRegistration) =>
	{
		notification.open({
			message: 'Update Available',
			description:
				'Click this message to reload your current tab and update to the newest version. Changes will not be saved.',
			duration: 0,
			onClick: () =>
			{
				const waitingServiceWorker = reg.waiting;
				if (waitingServiceWorker)
				{
					waitingServiceWorker.addEventListener('statechange', event =>
					{
						console.log('E', event);
						// @ts-ignore
						if (event && event.target && event.target.state === 'activated')
						{
							window.location.reload();
						}
					});
					waitingServiceWorker.postMessage({type: 'SKIP_WAITING'});
				}

			},
		});
	};

	const onSuccess = () =>
	{
		notification.open({
			message: 'Content cached for offline use',
			description:
				'This webapp has been cached for offline use.',
			duration: 16,
		});
	};

	useEffect(() =>
	{
		serviceWorker.register({onUpdate, onSuccess});
	}, []);

	return (
		<div>

		</div>
	);
};

export default ServiceWorker;