type PropsType = {
    href: string;
    className?: string;
};

export const Link: React.FC<PropsType> = props => {
    const { href, className } = props;
    const { children } = props;

    const IsExternalLink = href.startsWith('http');

    return (
        <a {...{ href, className }} target={IsExternalLink ? '_blank' : undefined} rel={IsExternalLink ? 'nofollow noopener' : undefined}>
            {children}
        </a>
    );
};
