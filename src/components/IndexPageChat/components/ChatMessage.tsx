import React from 'react';
import reactStringReplace from 'react-string-replace';

import dayjs from 'dayjs';

import { ChatMessageInfo, EmojiInfo } from '../types';

import styles from './ChatMessage.module.scss';

type ChatMessageProps = {
	message: ChatMessageInfo;
	emojis: EmojiInfo[] | undefined;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, emojis }) => {
	const time = React.useMemo(() => dayjs(message.createdAt), [message.createdAt]);

	const isSystem = message.type === 'System';

	const messageContent = React.useMemo(() => {
		let content: React.ReactNode | undefined = message.text;
		if (emojis) {
			for (const emoji of emojis) {
				content = reactStringReplace(content as any, emoji.code, (match, index) => {
					const style = [
						emoji.uiColorInverted ? 'color-inverted' : '',
						emoji.uiReversedX ? 'reversed-x' : '',
					]
						.filter(Boolean)
						.join(' ');

					return (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							key={match + index}
							src={emoji.imageUrl}
							alt={emoji.code}
							width={emoji.imageWidth}
							height={emoji.imageHeight}
							data-style={!!style ? style : null}
						/>
					);
				});
			}
		}
		return content;
	}, [emojis, message.text]);

	return (
		<div className={styles.chatMessage} data-system={isSystem ? '' : null}>
			<time dateTime={message.createdAt} title={time.format('LLL')}>
				{time.format('HH:mm')}
			</time>
			{isSystem ? (
				messageContent
			) : (
				<React.Fragment>
					<b>{message.nickname}</b>: {messageContent}
				</React.Fragment>
			)}
		</div>
	);
};
