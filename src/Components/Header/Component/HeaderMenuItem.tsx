import type { HeaderMenuItemType } from '../HeaderTypes';

type PropsType = HeaderMenuItemType & { className: string };

const HeaderMenuItem: React.FC<PropsType> = ({ type, title, icon, link, onClick, className }) => {
    if (type === 'button' && onClick) {
        return <button {...{ onClick, className, title }}>{icon}</button>;
    }

    if (type === 'link' && link) {
        return (
            <a {...{ className, title }} href={link} target="_blank" rel="nofollow noopener">
                {icon}
            </a>
        );
    }

    return null;
};

export default HeaderMenuItem;
