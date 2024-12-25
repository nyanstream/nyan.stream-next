import React from 'react';
import clsx from 'clsx';

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

	const [bearerToken, setBearerToken] = React.useState<string>();
	const [connectionId, setConnectionId] = React.useState<string>();

	const [messages, setMessages] = React.useState<any[]>();
	const [users, setUsers] = React.useState<any[]>();
	const [emojis, setEmojis] = React.useState<any[]>();

	const isAuthorized = !!bearerToken;

	const insertNewMessages = React.useCallback((messages: any[]) => {
		console.log(messages);
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
		sseConnection.current.addEventListener('error', event => {
			console.error('SSE error', event);
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
						<button type="button" className={styles.chat__sender__emojiButton}>
							Эмодзи
						</button>
						<input
							type="text"
							name="message"
							placeholder="Сообщение"
							required
							minLength={1}
							maxLength={150}
						/>
						<button type="submit">Отправить</button>
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
