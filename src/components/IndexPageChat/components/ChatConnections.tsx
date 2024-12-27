import React from 'react';

import { Popover } from 'react-tiny-popover';

import { IconCircle, IconUser } from '@/components/common';

import { type UserInfo } from '../types';

import styles from './ChatConnections.module.scss';

type ChatConnectionsProps = {
	bearerToken: string | undefined;
	users: UserInfo[] | undefined;
	connectionsCount: number | undefined;
};

export const ChatConnections: React.FC<ChatConnectionsProps> = ({
	bearerToken,
	users,
	connectionsCount,
}) => {
	const [isConnectionsPopoverOpen, setIsConnectionsPopoverOpen] = React.useState(false);

	return (
		<Popover
			isOpen={isConnectionsPopoverOpen}
			containerClassName={styles.connections__popover}
			positions={['bottom', 'left', 'right', 'top']}
			align="end"
			onClickOutside={() => setIsConnectionsPopoverOpen(false)}
			content={
				<ul>
					{users?.map(user => (
						<li
							key={user.userId}
							data-id={user.userId}
							data-role={user.role}
							data-status={user.status}>
							{user.nickname}
						</li>
					))}
				</ul>
			}>
			<div
				className={styles.chatConnections__badge}
				data-clickable={bearerToken ? '' : null}
				onClick={() => bearerToken && setIsConnectionsPopoverOpen(!isConnectionsPopoverOpen)}>
				<div title="Подключения">
					<span className={styles.chatConnections__badge__dot}>
						<IconCircle />
					</span>{' '}
					<span>{connectionsCount || 0}</span>
				</div>
				<div title="Пользователи в чате">
					<span className={styles.chatConnections__badge__user}>
						<IconUser />
					</span>{' '}
					<span>{users?.length || 0}</span>
				</div>
			</div>
		</Popover>
	);
};
