import type { ReactComponent } from '@/utilities/types';

import type { HeaderMenuItemType } from '../HeaderTypes';

type PropsType = HeaderMenuItemType & { className: string };

const HeaderMenuItem: ReactComponent<PropsType> = ({ id, type, title, icon, link, onClick, className }) => {
    if (type === 'button' && onClick) {
        return (
            <button {...{ onClick, className, title }} data-id={id}>
                {icon}
            </button>
        );
    }

    if (type === 'link' && link) {
        return (
            <a {...{ className, title }} data-id={id} href={link} target="_blank" rel="nofollow noopener noreferrer">
                {icon}
            </a>
        );
    }

    return null;
};

export default HeaderMenuItem;
