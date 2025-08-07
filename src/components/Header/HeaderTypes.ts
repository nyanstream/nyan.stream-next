import React from 'react';

export type HeaderMenuItemType = {
	id: string;
	type: 'button' | 'link';
	title: string;
	icon: React.ReactNode;
	link?: string;
	onClick?: () => void;
};
