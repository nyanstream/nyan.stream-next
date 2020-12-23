export type HeaderMenuItemType = {
    type: 'button' | 'link';
    title: string;
    icon: JSX.Element;
    link?: string;
    onClick?: () => void;
};
