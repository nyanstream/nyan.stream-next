import React from 'react';

import clsx from 'clsx';
import { Popover } from 'react-tiny-popover';

import {
	API_SSE_URL,
	API_GET_CHAT_USERS_URL,
	API_GET_LATEST_MESSAGES_URL,
	API_GUEST_LOGIN_URL,
	API_POST_CHAT_MESSAGE_URL,
	API_GET_EMOJIS_URL,
} from './constants';
import styles from './Chat.module.scss';
import { ChatMessage } from './ChatMessage';

export const Chat: React.FC = () => {
	const initialRequestDone = React.useRef(false);
	const sseConnection = React.useRef<EventSource | null>(null);

	const messagesBox = React.useRef<HTMLDivElement | null>(null);
	const sendForm = React.useRef<HTMLFormElement | null>(null);
	const sendFormInput = React.useRef<HTMLInputElement | null>(null);

	const [bearerToken, setBearerToken] = React.useState<string>();
	const [connectionId, setConnectionId] = React.useState<string>();

	const [messages, setMessages] = React.useState<any[]>();
	const [users, setUsers] = React.useState<any[]>();
	const [emojis, setEmojis] = React.useState<any[]>();

	const [isEmojiPopoverOpen, setIsEmojiPopoverOpen] = React.useState(false);

	const isAuthorized = !!bearerToken;

	const insertNewMessages = React.useCallback((messages: any[]) => {
		setMessages(prevMessages => [...(prevMessages ?? []), ...messages]);
		setTimeout(() => {
			if (messagesBox.current) {
				messagesBox.current.scroll({
					top: messagesBox.current.scrollHeight,
					behavior: 'instant',
				});
			}
		}, 0);
	}, []);

	React.useEffect(() => {
		(async () => {
			if (initialRequestDone.current) return;

			const [usersData, messagesData, emojis] = await Promise.all([
				fetch(API_GET_CHAT_USERS_URL).then(response => response.json()),
				fetch(API_GET_LATEST_MESSAGES_URL).then(response => response.json()),
				fetch(API_GET_EMOJIS_URL).then(response => response.json()),
			]);

			setUsers(usersData.users);
			insertNewMessages(messagesData);
			setEmojis(emojis);

			initialRequestDone.current = true;
		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!sseConnection.current && messages && users) {
		sseConnection.current = new EventSource(API_SSE_URL);
		sseConnection.current.addEventListener('message', event => {
			const messageData = JSON.parse(event.data);
			if (messageData.type === 'UserConnected' && !connectionId) {
				setConnectionId(messageData.data.connectionId);
			}
			if (messageData.type === 'UserLogin') {
				setUsers(prevUsers => [...(prevUsers ?? []), messageData.data]);
			}
			if (messageData.type === 'UserLogout') {
				setUsers(prevUsers =>
					prevUsers ? prevUsers.filter(user => user.id !== messageData.data.userId) : []
				);
			}
			if (messageData.type === 'NewChatMessage') {
				insertNewMessages([messageData.data]);
			}
			if (messageData.type === 'UserInactiveStatus') {
				// TODO: Implement user inactive status
			}
		});
		sseConnection.current.addEventListener('error', () => {
			sseConnection.current?.close();
			setConnectionId(undefined);

			insertNewMessages([
				{
					id: crypto.randomUUID(),
					createdAt: new Date().toISOString(),
					type: 'system',
					nickname: 'System',
					text: 'Соединение разорвано. Перезагрузите страницу.',
				},
			]);
		});
	}

	const handleLogin = React.useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			if (!connectionId) return;
			event.preventDefault();

			const formData = new FormData(event.currentTarget);

			const nickname = formData.get('nickname');
			if (typeof nickname !== 'string') return;

			fetch(API_GUEST_LOGIN_URL, {
				method: 'POST',
				body: JSON.stringify({ connectionId, nickname }),
				headers: { 'Content-Type': 'application/json' },
			})
				.then(response => response.json())
				.then(data => {
					if (data.bearer) {
						setBearerToken(data.bearer);
					}
				});
		},
		[connectionId]
	);

	const handleSend = React.useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			if (!bearerToken) return;
			event.preventDefault();

			const formData = new FormData(event.currentTarget);

			const message = formData.get('message');
			if (typeof message !== 'string') return;

			fetch(API_POST_CHAT_MESSAGE_URL, {
				method: 'POST',
				body: JSON.stringify({ text: message }),
				headers: { 'Content-Type': 'application/json', Authorization: bearerToken },
			})
				.then(response => response.json())
				.then(data => {
					if (data.bearer) {
						setBearerToken(data.bearer);
					}
					sendForm.current?.reset();
				});
		},
		[bearerToken]
	);

	const handleAddEmoji = React.useCallback((emojiCode: string) => {
		if (!sendFormInput.current) return;

		const message = sendFormInput.current.value;
		sendFormInput.current.value = [message, emojiCode].join(' ').trim();
		sendFormInput.current.focus();
	}, []);

	return (
		<div className={styles.chat}>
			<div ref={messagesBox} className={styles.chat__messages}>
				{messages
					? messages.map(message => (
							<ChatMessage key={message.id} message={message} emojis={emojis} />
						))
					: null}
			</div>

			{isAuthorized ? (
				<div className={clsx(styles.chat__footer, styles.chat__sender)}>
					<form ref={sendForm} onSubmit={handleSend}>
						<Popover
							isOpen={isEmojiPopoverOpen}
							containerClassName={styles.chat__emojiPopover}
							positions={['top', 'bottom', 'left', 'right']}
							align="start"
							onClickOutside={() => setIsEmojiPopoverOpen(false)}
							content={
								emojis ? (
									<ul className={styles.chat__emojiPopover__list}>
										{emojis.map(emoji => (
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
								) : (
									<div>no info :(</div>
								)
							}>
							<button
								type="button"
								className={styles.chat__sender__emojiButton}
								onClick={() => setIsEmojiPopoverOpen(!isEmojiPopoverOpen)}
								disabled={!connectionId}>
								Эмодзи
							</button>
						</Popover>
						<input
							ref={sendFormInput}
							type="text"
							name="message"
							placeholder="Сообщение"
							required
							autoFocus
							minLength={1}
							maxLength={150}
							disabled={!connectionId}
						/>
						<button type="submit" disabled={!connectionId}>
							Отправить
						</button>
					</form>
				</div>
			) : (
				<div className={clsx(styles.chat__footer, styles.chat__login)}>
					<form onSubmit={handleLogin}>
						<input
							type="text"
							name="nickname"
							placeholder="Никнейм"
							required
							minLength={1}
							maxLength={20}
						/>
						<button type="submit" disabled={!connectionId}>
							Войти
						</button>
					</form>
				</div>
			)}
		</div>
	);
};
