import React from 'react';
import reactStringReplace from 'react-string-replace';

import dayjs from 'dayjs';
import { Popover } from 'react-tiny-popover';

import { type ChatMessageInfo, EmojiInfo } from '../types';

import styles from './ChatMessage.module.scss';

type ChatMessageProps = {
	message: ChatMessageInfo;
	canModerateChat: boolean;
	emojis: EmojiInfo[] | undefined;
	handleMessageDelete: (chatMessageId: string, banUser?: boolean) => void;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({
	message,
	canModerateChat,
	emojis,
	handleMessageDelete,
}) => {
	const [isModerationPopoverOpen, setIsModerationPopoverOpen] = React.useState(false);

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
					{canModerateChat ? (
						<Popover
							isOpen={isModerationPopoverOpen}
							containerClassName={styles.chatMessage__menu}
							positions="top"
							align="start"
							onClickOutside={() => setIsModerationPopoverOpen(false)}
							content={
								<div onMouseLeave={() => setIsModerationPopoverOpen(false)}>
									<b>{message.nickname}</b>
									<button type="button" onClick={() => handleMessageDelete(message.id)}>
										Удалить
									</button>
									<button type="button" onClick={() => handleMessageDelete(message.id, true)}>
										Бан
									</button>
								</div>
							}>
							<b style={{ cursor: 'pointer' }} onClick={() => setIsModerationPopoverOpen(true)}>
								{message.nickname}
							</b>
						</Popover>
					) : (
						<b>{message.nickname}</b>
					)}{' '}
					: {messageContent}
				</React.Fragment>
			)}
		</div>
	);
};
