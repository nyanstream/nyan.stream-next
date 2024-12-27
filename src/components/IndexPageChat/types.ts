export const ChatMessageInfoType = {
	user: 'User',
	system: 'System',
} as const;

export type ChatMessageInfoType = (typeof ChatMessageInfoType)[keyof typeof ChatMessageInfoType];

export type ChatMessageInfo = {
	id: string;
	createdAt: string;
	nickname: string;
	userId: string | null;
	text: string;
	type: ChatMessageInfoType;
};

export const UserInfoRole = {
	guest: 'Guest',
	user: 'User',
	moderator: 'Moderator',
	administrator: 'Administrator',
};

export type UserInfoRole = (typeof UserInfoRole)[keyof typeof UserInfoRole];

export const UserInfoStatus = {
	active: 'active',
	inactive: 'inactive',
};

export type UserInfoStatus = (typeof UserInfoStatus)[keyof typeof UserInfoStatus];

export type UserInfo = {
	userId: string;
	role: UserInfoRole;
	nickname: string;
	status: UserInfoStatus;
};

export type EmojiInfo = {
	code: `:${string}:`;
	id: string;
	imageWidth: number;
	imageHeight: number;
	imageUrl: string;
	uiColorInverted: boolean;
	uiHidden: boolean;
	uiReversedX: boolean;
};
