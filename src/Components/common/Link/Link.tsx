type PropsType = {
    href: string;
};

export const Link: React.FC<PropsType> = ({ href, children }) => {
    const IsExternalLink = href.startsWith('http');

    return (
        <a href={href} target={IsExternalLink ? '_blank' : undefined} rel={IsExternalLink ? 'nofollow noopener' : undefined}>
            {children}
        </a>
    );
};
