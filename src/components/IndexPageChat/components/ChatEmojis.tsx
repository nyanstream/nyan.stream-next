import React from 'react';

import { Popover } from 'react-tiny-popover';

import { type EmojiInfo } from '../types';

import styles from './ChatEmojis.module.scss';

type ChatEmojisProps = {
	emojis: EmojiInfo[] | undefined;
	handleAddEmoji: (emojiCode: string) => void;
	isConnected: boolean;
};

export const ChatEmojis: React.FC<ChatEmojisProps> = ({ emojis, handleAddEmoji, isConnected }) => {
	const [isEmojiPopoverOpen, setIsEmojiPopoverOpen] = React.useState(false);

	return (
		<Popover
			isOpen={isEmojiPopoverOpen}
			containerClassName={styles.chatEmojis__popover}
			positions={['top', 'bottom', 'left', 'right']}
			align="start"
			onClickOutside={() => setIsEmojiPopoverOpen(false)}
			content={
				<ul className={styles.chatEmojis__popover__list}>
					{emojis?.map(emoji => (
						<li key={emoji.id}>
							<button type="button" onClick={() => handleAddEmoji(emoji.code)}>
								{emoji.code}
								<img
									src={emoji.imageUrl}
									alt={emoji.code}
									width={emoji.imageWidth}
									height={emoji.imageHeight}
									hidden={emoji.uiHidden}
									data-inverted={emoji.uiColorInverted ? '' : null}
									data-style={emoji.uiColorInverted ? 'color-inverted' : null}
								/>
							</button>
						</li>
					))}
				</ul>
			}>
			<button
				type="button"
				className={styles.chatEmojis__button}
				onClick={() => setIsEmojiPopoverOpen(!isEmojiPopoverOpen)}
				disabled={!isConnected || !emojis}>
				Эмодзи
			</button>
		</Popover>
	);
};
