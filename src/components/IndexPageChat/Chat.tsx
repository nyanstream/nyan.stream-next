import React from 'react';

import clsx from 'clsx';

import { IconDiscord, IconSend } from '@/components/common';
import type {
	GetDiscordOauthUrlListData,
	PostGuestLoginCreateData,
	PostLoginWithTokenCreateData,
} from '@/api/snat';

import { API_SSE_URL } from './constants';
import { apiClient } from './api';
import type { ChatMessageInfo, EmojiInfo, UserInfo } from './types';
import { cleanUrl } from './utils';

import { ChatMessage } from './components/ChatMessage';
import { ChatConnections } from './components/ChatConnections';
import { ChatEmojis } from './components/ChatEmojis';

import styles from './Chat.module.scss';
import { ChatOauthSignupDialog } from './components/ChatOauthSignupDialog';

export const Chat: React.FC = () => {
	const initialRequestDone = React.useRef(false);
	const sseConnection = React.useRef<EventSource | null>(null);

	const oauthSignupDialog = React.useRef<HTMLDialogElement | null>(null);
	const messagesBox = React.useRef<HTMLDivElement | null>(null);
	const sendForm = React.useRef<HTMLFormElement | null>(null);
	const sendFormInput = React.useRef<HTMLInputElement | null>(null);

	const locationHash = React.useRef(new URLSearchParams(window.location.hash.replace('#', '')));
	const oauthSessionIdFromUrl = React.useRef(locationHash.current.get('oauthSessionId'));
	const bearerTokenFromUrl = React.useRef(locationHash.current.get('bearerToken'));

	const [bearerToken, setBearerToken] = React.useState<string>();
	const [connectionId, setConnectionId] = React.useState<string>();

	const [messages, setMessages] = React.useState<ChatMessageInfo[]>();
	const [emojis, setEmojis] = React.useState<EmojiInfo[]>();

	const [users, setUsers] = React.useState<UserInfo[]>();
	const [connectionsCount, setConnectionsCount] = React.useState<number>();

	const isConnected = React.useMemo(() => !!connectionId, [connectionId]);
	const isAuthorized = React.useMemo(() => !!bearerToken, [bearerToken]);

	const insertNewMessages = React.useCallback((messages: ChatMessageInfo[]) => {
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
				apiClient.api.getChatUsersList().then(response => response.json()),
				apiClient.api.getLatestMessagesList().then(response => response.json()),
				apiClient.api.getEmojisList().then(response => response.json()),
			]);

			setUsers(usersData.users);
			setConnectionsCount(usersData.connectionsCount);
			insertNewMessages(messagesData);
			setEmojis(emojis);

			if (oauthSessionIdFromUrl.current) {
				oauthSignupDialog.current?.showModal();
				console.log(oauthSessionIdFromUrl.current);
			}

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

				if (bearerTokenFromUrl.current) {
					apiClient.api
						.postLoginWithTokenCreate(
							{ connectionId: messageData.data.connectionId },
							{
								headers: {
									Authorization: bearerTokenFromUrl.current,
								},
							}
						)
						.then(response => response.json())
						.then((data: PostLoginWithTokenCreateData) => {
							if (data.success && bearerTokenFromUrl.current) {
								setBearerToken(bearerTokenFromUrl.current);
								cleanUrl();
							}
						});
				}
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
			if (messageData.type === 'NewConnection') {
				setConnectionsCount(messageData.data.connectionsCount);
			}
			if (messageData.type === 'ConnectionClosed') {
				setConnectionsCount(messageData.data.connectionsCount);
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
					type: 'System',
					userId: null,
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

			apiClient.api
				.postGuestLoginCreate({
					connectionId,
					nickname,
				})
				.then(response => response.json())
				.then((data: PostGuestLoginCreateData) => {
					if (data.bearer) {
						setBearerToken(data.bearer);
					}
				});
		},
		[connectionId]
	);

	const handleDiscordLogin = React.useCallback(() => {
		apiClient.api
			.getDiscordOauthUrlList()
			.then(response => response.json())
			.then((data: GetDiscordOauthUrlListData) => {
				if (data.url) {
					const redirectUrl = data.url;
					window.location.replace(redirectUrl);
				}
			});
	}, []);

	const handleSend = React.useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			if (!bearerToken) return;
			event.preventDefault();

			const formData = new FormData(event.currentTarget);

			const message = formData.get('message');
			if (typeof message !== 'string') return;

			apiClient.api
				.postSendChatMessageCreate(
					{ text: message },
					{
						headers: {
							Authorization: bearerToken,
						},
					}
				)
				.then(response => response.json())
				.then(() => {
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
		<React.Fragment>
			<ChatOauthSignupDialog
				dialogRef={oauthSignupDialog}
				connectionId={connectionId}
				oauthSessionId={oauthSessionIdFromUrl.current}
				setBearerToken={setBearerToken}
			/>

			<div className={styles.chat}>
				<div ref={messagesBox} className={styles.chat__messages}>
					{messages?.map(message => (
						<ChatMessage key={message.id} message={message} emojis={emojis} />
					))}
				</div>

				{isAuthorized ? (
					<div className={clsx(styles.chat__footer, styles.chat__sender)}>
						<ChatEmojis emojis={emojis} handleAddEmoji={handleAddEmoji} isConnected={isConnected} />

						<form ref={sendForm} onSubmit={handleSend}>
							<input
								ref={sendFormInput}
								type="text"
								name="message"
								placeholder="Сообщение"
								required
								autoFocus
								minLength={1}
								maxLength={150}
								disabled={!isConnected}
							/>
							<button type="submit" disabled={!isConnected}>
								<IconSend />
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
							<button type="submit" disabled={!isConnected}>
								Войти
							</button>
							<span>или</span>
							<button
								type="button"
								disabled={!isConnected}
								title="Войти через Discord"
								className={styles.chat__login__discordLoginButton}
								onClick={handleDiscordLogin}>
								<IconDiscord className={styles.chat__login__discordLoginButton__logo} aria-hidden />{' '}
								Войти
							</button>
						</form>
					</div>
				)}

				<ChatConnections
					bearerToken={bearerToken}
					users={users}
					connectionsCount={connectionsCount}
				/>
			</div>
		</React.Fragment>
	);
};
