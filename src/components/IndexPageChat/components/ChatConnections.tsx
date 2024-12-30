import React from 'react';

import clsx from 'clsx';

import { Popover } from 'react-tiny-popover';
import { Roboto } from 'next/font/google';

import { ChatUserRoleEnum } from '@/api/snat';
import { IconCircle, IconUser } from '@/components/common';

import { type UserInfo } from '../types';

import styles from './ChatConnections.module.scss';

// TODO: create shared component for Popover to apply this style everywhere
const robotoFont = Roboto({
	weight: ['400'],
	variable: '--roboto-font',
	subsets: ['latin', 'cyrillic'],
});

type ChatConnectionsProps = {
	isAuthorized: boolean;
	users: UserInfo[] | undefined;
	connectionsCount: number | undefined;
};

export const ChatConnections: React.FC<ChatConnectionsProps> = ({
	isAuthorized,
	users,
	connectionsCount,
}) => {
	const [isConnectionsPopoverOpen, setIsConnectionsPopoverOpen] = React.useState(false);

	const sortedUsers = React.useMemo(() => {
		return sortUsersByRole(users);
	}, [users]);

	return (
		<Popover
			isOpen={isConnectionsPopoverOpen}
			containerClassName={clsx(styles.chatConnections__popover, robotoFont.variable)}
			positions={['bottom', 'left', 'right', 'top']}
			align="end"
			onClickOutside={() => setIsConnectionsPopoverOpen(false)}
			content={
				<div onMouseLeave={() => setIsConnectionsPopoverOpen(false)}>
					<ul>
						{sortedUsers?.map(user => (
							<li key={user.id} data-id={user.id} data-role={user.role} data-status={user.status}>
								{user.nickname}
							</li>
						))}
					</ul>
				</div>
			}>
			<div
				className={styles.chatConnections__badge}
				data-clickable={isAuthorized ? '' : null}
				onClick={() => isAuthorized && setIsConnectionsPopoverOpen(!isConnectionsPopoverOpen)}>
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

const sortUsersByRole = (users: UserInfo[] | undefined) => {
	return users?.toSorted((a, b) => rolePriority[a.role] - rolePriority[b.role]);
};

const rolePriority = {
	[ChatUserRoleEnum.Administrator]: 1,
	[ChatUserRoleEnum.Moderator]: 2,
	[ChatUserRoleEnum.User]: 3,
	[ChatUserRoleEnum.Guest]: 4,
};
