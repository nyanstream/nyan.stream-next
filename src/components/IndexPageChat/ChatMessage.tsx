import React from 'react';
import dayjs from 'dayjs';

import styles from './Chat.module.scss';

type ChatMessageProps = {
	message: any;
	emojis: any[] | undefined;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, emojis }) => {
	const time = React.useMemo(() => dayjs(message.createdAt), [message.createdAt]);

	return (
		<div className={styles.chat__messages__message}>
			<time dateTime={message.createdAt} title={time.format('LLL')}>
				{time.format('HH:mm')}
			</time>
			<React.Fragment>
				<b>{message.nickname}</b>: {message.text}
			</React.Fragment>
		</div>
	);
};
