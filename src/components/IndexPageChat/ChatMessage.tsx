import React from 'react';

import dayjs from 'dayjs';
import parseHtml from 'html-react-parser';

import styles from './Chat.module.scss';

type ChatMessageProps = {
	message: any;
	emojis: any[] | undefined;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, emojis }) => {
	const time = React.useMemo(() => dayjs(message.createdAt), [message.createdAt]);

	const isSystem = message.type === 'system';

	const messageText = React.useMemo(() => {
		let text = message.text;
		if (emojis) {
			for (const emoji of emojis) {
				text = text.replaceAll(
					emoji.code,
					`<img src="${emoji.imageUrl}" alt="${emoji.code}" width="${emoji.imageWidth}" height="${emoji.imageHeight}" ${emoji.uiHidden ? 'hidden' : ''} ${emoji.uiColorInverted ? 'data-style="color-inverted"' : ''} />`
				);
			}
		}
		return parseHtml(text);
	}, [emojis, message.text]);

	return (
		<div className={styles.chat__messages__message} data-system={isSystem ? '' : null}>
			<time dateTime={message.createdAt} title={time.format('LLL')}>
				{time.format('HH:mm')}
			</time>
			{isSystem ? (
				messageText
			) : (
				<React.Fragment>
					<b>{message.nickname}</b>: {messageText}
				</React.Fragment>
			)}
		</div>
	);
};
