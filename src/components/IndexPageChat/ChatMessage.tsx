import React from 'react';
import reactStringReplace from 'react-string-replace';

import dayjs from 'dayjs';

import styles from './Chat.module.scss';

type ChatMessageProps = {
	message: any;
	emojis: any[] | undefined;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, emojis }) => {
	const time = React.useMemo(() => dayjs(message.createdAt), [message.createdAt]);

	const isSystem = message.type === 'system';

	const messageContent = React.useMemo(() => {
		let text = message.text;
		if (emojis) {
			for (const emoji of emojis) {
				text = reactStringReplace(text, emoji.code, (match, index) => {
					const style = [
						emoji.uiColorInverted ? 'color-inverted' : '',
						emoji.uiReversedX ? 'reversed-x' : '',
					]
						.filter(Boolean)
						.join(' ');

					return (
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
		return text;
	}, [emojis, message.text]);

	return (
		<div className={styles.chat__messages__message} data-system={isSystem ? '' : null}>
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
