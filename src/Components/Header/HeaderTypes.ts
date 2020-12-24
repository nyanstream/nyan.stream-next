export type HeaderMenuItemType = {
    id: string;
    type: 'button' | 'link';
    title: string;
    icon: JSX.Element;
    link?: string;
    onClick?: () => void;
};
