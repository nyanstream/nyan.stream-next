import React from 'react';

import { API_POST_DISCORD_SIGNUP_URL } from '../constants';
import { cleanUrl } from '../utils';

import styles from './ChatOauthSignupDialog.module.scss';

type ChatOauthSignupDialogProps = {
	dialogRef: React.RefObject<HTMLDialogElement>;
	connectionId: string | undefined;
	oauthSessionId: string | null;
	setBearerToken: (bearerToken: string) => void;
};

export const ChatOauthSignupDialog: React.FC<ChatOauthSignupDialogProps> = ({
	dialogRef,
	connectionId,
	oauthSessionId,
	setBearerToken,
}) => {
	const handleDiscordSignup = React.useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			if (!connectionId) return;
			event.preventDefault();

			const formData = new FormData(event.currentTarget);

			const nickname = formData.get('nickname');
			if (typeof nickname !== 'string') return;

			fetch(API_POST_DISCORD_SIGNUP_URL, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					oauthSessionId: oauthSessionId,
					connectionId,
					nickname,
				}),
			})
				.then(response => response.json())
				.then(data => {
					if (data.bearer) {
						setBearerToken(data.bearer);
						dialogRef.current?.close();
						cleanUrl();
					}
				})
				.catch(error => {
					console.error(error);
					if (error instanceof Error) {
						alert(error.message);
					}
				});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[connectionId, setBearerToken]
	);

	return (
		<dialog ref={dialogRef} className={styles.chatOauthSignupDialog}>
			<div>
				<form className="form" onClick={handleDiscordSignup}>
					<div>
						<input name="nickname" placeholder="Никнейм" required minLength={1} maxLength={20} />
					</div>
					<div>
						<button type="submit">Окончить регистрацию</button>
					</div>
				</form>
			</div>
		</dialog>
	);
};
