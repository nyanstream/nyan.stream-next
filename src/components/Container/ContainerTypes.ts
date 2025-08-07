export type MetaTag = {
	name: string;
	content: string | undefined;
};

export type HeadLink = ({ id: string; rel?: string } | { id?: string; rel: string }) & {
	href: string;
};
