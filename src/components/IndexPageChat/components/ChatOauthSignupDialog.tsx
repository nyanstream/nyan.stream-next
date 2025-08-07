import React from 'react';

import type { PostDiscordSignupCreateData } from '@/api/snat';

import { apiClient } from '../api';
import { cleanUrl } from '../utils';
import type { UserInfo } from '../types';

import styles from './ChatOauthSignupDialog.module.scss';
import { loginOrSignupFormValuesValidationSchema } from '../validation';

type ChatOauthSignupDialogProps = {
	dialogRef: React.RefObject<HTMLDialogElement | null>;
	connectionId: string | undefined;
	oauthSessionId: string | null;
	setBearerToken: (bearerToken: string) => void;
	setCurrentUser: (currentUser: UserInfo) => void;
};

export const ChatOauthSignupDialog: React.FC<ChatOauthSignupDialogProps> = ({
	dialogRef,
	connectionId,
	oauthSessionId,
	setBearerToken,
	setCurrentUser,
}) => {
	const loginFormInput = React.useRef<HTMLInputElement | null>(null);

	const handleDiscordSignup = React.useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			if (!connectionId || !oauthSessionId) return;
			event.preventDefault();

			const formData = new FormData(event.currentTarget) as any;
			const formValuesParsed = loginOrSignupFormValuesValidationSchema.safeParse(
				Object.fromEntries(formData.entries())
			);

			if (!formValuesParsed.success) {
				const errorMessages = formValuesParsed.error.issues.map(issue => issue.message);
				loginFormInput.current?.setCustomValidity(errorMessages.join(', '));
				return;
			}

			apiClient.api
				.postDiscordSignupCreate({
					oauthSessionId: oauthSessionId,
					connectionId,
					nickname: formValuesParsed.data.nickname,
				})
				.then(response => response.json())
				.then((data: PostDiscordSignupCreateData) => {
					setCurrentUser(data.user);
					setBearerToken(data.bearer);
					dialogRef.current?.close();
					cleanUrl();
				})
				.catch((error: any) => {
					const message = error?.error?.message;
					loginFormInput.current?.setCustomValidity(message);
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
						<input
							ref={loginFormInput}
							name="nickname"
							placeholder="Никнейм"
							required
							onInput={handleInput}
						/>
					</div>
					<div>
						<button type="submit">Окончить регистрацию</button>
					</div>
				</form>
			</div>
		</dialog>
	);
};

const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
	event.currentTarget.setCustomValidity('');
};
