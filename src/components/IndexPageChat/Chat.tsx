import React from 'react';

import clsx from 'clsx';
import { uniqBy } from 'es-toolkit';

import { IconDiscord, IconSend } from '@/components/common';
import {
	ChatMessageTypeEnum,
	ChatUserRoleEnum,
	ChatUserStatusEnum,
	type GetDiscordOauthUrlListData,
	type PostGuestLoginCreateData,
	type PostLoginWithTokenCreateData,
} from '@/api/snat';

import { API_SSE_URL } from './constants';
import { apiClient } from './api';
import type { ChatMessageInfo, EmojiInfo, UserInfo } from './types';
import { cleanUrl } from './utils';
import {
	loginOrSignupFormValuesValidationSchema,
	sendFormValuesValidationSchema,
} from './validation';

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
	const loginFormInput = React.useRef<HTMLInputElement | null>(null);

	const locationHash = React.useRef(new URLSearchParams(window.location.hash.replace('#', '')));
	const oauthSessionIdFromUrl = React.useRef(locationHash.current.get('oauthSessionId'));
	const bearerTokenFromUrl = React.useRef(locationHash.current.get('bearerToken'));

	const [currentUser, setCurrentUser] = React.useState<UserInfo>();
	const [bearerToken, setBearerToken] = React.useState<string>();
	const [connectionId, setConnectionId] = React.useState<string>();

	const [messages, setMessages] = React.useState<ChatMessageInfo[]>();
	const [emojis, setEmojis] = React.useState<EmojiInfo[]>();

	const [users, setUsers] = React.useState<UserInfo[]>();
	const [connectionsCount, setConnectionsCount] = React.useState<number>();

	const isConnected = React.useMemo(() => !!connectionId, [connectionId]);
	const isAuthorized = React.useMemo(() => !!bearerToken, [bearerToken]);

	const canModerateChat = React.useMemo(() => {
		return (
			currentUser?.role === ChatUserRoleEnum.Moderator ||
			currentUser?.role === ChatUserRoleEnum.Administrator
		);
	}, [currentUser?.role]);

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
							if (bearerTokenFromUrl.current) {
								setCurrentUser(data.user);
								setBearerToken(bearerTokenFromUrl.current);
								cleanUrl();
							}
						});
				}
			}
			if (messageData.type === 'UserLogin') {
				setUsers(prevUsers => uniqBy([...(prevUsers ?? []), messageData.data], user => user.id));
			}
			if (messageData.type === 'UserLogout') {
				setUsers(prevUsers => prevUsers?.filter(user => user.id !== messageData.data.userId));
			}
			if (messageData.type === 'NewChatMessage') {
				insertNewMessages([messageData.data]);
			}
			if (messageData.type === 'MessagesDeleted') {
				setMessages(prevMessages => {
					const newMessages = prevMessages?.filter(
						message => !messageData.data.messagesIdList.includes(message.id)
					);
					return newMessages;
				});
			}
			if (messageData.type === 'NewConnection') {
				setConnectionsCount(messageData.data.connectionsCount);
			}
			if (messageData.type === 'ConnectionClosed') {
				setConnectionsCount(messageData.data.connectionsCount);
			}
			if (messageData.type === 'UserInactiveStatus') {
				setUsers(prevUsers =>
					prevUsers?.map(user => {
						if (user.id === messageData.data.userId) {
							return { ...user, status: ChatUserStatusEnum.Inactive };
						}
						return user;
					})
				);
			}
		});
		sseConnection.current.addEventListener('error', () => {
			sseConnection.current?.close();
			setConnectionId(undefined);

			// TODO: think of a more elegant way
			insertNewMessages([
				{
					id: crypto.randomUUID(),
					createdAt: new Date().toISOString(),
					type: ChatMessageTypeEnum.System,
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

			const formData = new FormData(event.currentTarget) as any;
			const formValuesParsed = loginOrSignupFormValuesValidationSchema.safeParse(
				Object.fromEntries(formData.entries())
			);

			if (!formValuesParsed.success) {
				const errorMessages = formValuesParsed.error.errors.map(error => error.message);
				loginFormInput.current?.setCustomValidity(errorMessages.join(', '));
				return;
			}

			apiClient.api
				.postGuestLoginCreate({
					connectionId,
					nickname: formValuesParsed.data.nickname,
				})
				.then(response => response.json())
				.then((data: PostGuestLoginCreateData) => {
					setCurrentUser(data.user);
					setBearerToken(data.bearer);
				})
				.catch((error: any) => {
					const message = error?.error?.message;
					loginFormInput.current?.setCustomValidity(message);
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

			const formData = new FormData(event.currentTarget) as any;
			const formValuesParsed = sendFormValuesValidationSchema.safeParse(
				Object.fromEntries(formData.entries())
			);

			if (!formValuesParsed.success) {
				const errorMessages = formValuesParsed.error.errors.map(error => error.message);
				sendFormInput.current?.setCustomValidity(errorMessages.join(', '));
				return;
			}

			apiClient.api
				.postSendChatMessageCreate(
					{ text: formValuesParsed.data.message },
					{
						headers: {
							Authorization: bearerToken,
						},
					}
				)
				.then(response => response.json())
				.then(() => {
					sendForm.current?.reset();
				})
				.catch((error: any) => {
					const message = error?.error?.message;
					sendFormInput.current?.setCustomValidity(message);
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

	const handleMessageDelete = React.useCallback(
		(chatMessageId: string, banUser = false) => {
			if (!bearerToken) return;
			apiClient.api
				.deleteChatMessageDelete(
					{ messageId: chatMessageId, banUserByIp: banUser },
					{ headers: { Authorization: bearerToken } }
				)
				.catch(error => {
					alert(JSON.stringify(error));
				});
		},
		[bearerToken]
	);

	return (
		<React.Fragment>
			<ChatOauthSignupDialog
				dialogRef={oauthSignupDialog}
				connectionId={connectionId}
				oauthSessionId={oauthSessionIdFromUrl.current}
				setBearerToken={setBearerToken}
				setCurrentUser={setCurrentUser}
			/>

			<div className={styles.chat}>
				<div ref={messagesBox} className={styles.chat__messages}>
					{messages?.map(message => (
						<ChatMessage
							key={message.id}
							message={message}
							canModerateChat={canModerateChat}
							emojis={emojis}
							handleMessageDelete={handleMessageDelete}
						/>
					))}
				</div>

				{isAuthorized ? (
					<div className={clsx(styles.chat__footer, styles.chat__sender)}>
						<ChatEmojis emojis={emojis} handleAddEmoji={handleAddEmoji} isConnected={isConnected} />

						<form ref={sendForm} onSubmit={handleSend}>
							<input
								ref={sendFormInput}
								onInput={handleInput}
								type="text"
								name="message"
								placeholder="Сообщение"
								autoComplete="off"
								autoFocus
								required
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
								ref={loginFormInput}
								type="text"
								name="nickname"
								placeholder="Никнейм"
								onInput={handleInput}
								required
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
					isAuthorized={isAuthorized}
					users={users}
					connectionsCount={connectionsCount}
				/>
			</div>
		</React.Fragment>
	);
};

const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
	event.currentTarget.setCustomValidity('');
};
