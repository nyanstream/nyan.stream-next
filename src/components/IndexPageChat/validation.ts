import { z } from 'zod';

const WHITESPACE_CHARS = /^\S*$/;

const TRICKY_CHARS = /^[^\x7F\u202A-\u202E\u202D\u2066-\u2069\u200E\u200F\u061C]*$/;

export const nicknameValidationSchema = z
	.string()
	.trim()
	.regex(WHITESPACE_CHARS, 'В нике не должно быть пробелов')
	.regex(TRICKY_CHARS, 'Unacceptable characters')
	.min(1, 'Обязательно')
	.max(20, 'Ник слишком длинный!');

export const chatMessageTextValidationSchema = z
	.string()
	.trim()
	.regex(TRICKY_CHARS, 'Unacceptable characters')
	.min(1, 'Обязательно')
	.max(500, 'Сообщение слишком длинное!');

export const loginOrSignupFormValuesValidationSchema = z.object({
	nickname: nicknameValidationSchema,
});

export const sendFormValuesValidationSchema = z.object({
	message: chatMessageTextValidationSchema,
});
