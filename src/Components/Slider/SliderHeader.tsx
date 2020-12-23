import { HeaderMenuItemType } from '../Header/HeaderTypes';

import HeaderMenuItem from '../Header/Component/HeaderMenuItem';

import { IconVK, IconTelegram, IconDiscord } from '../common';

import styles from '../Header/Component/Header.module.scss';

const SliderHeader: React.FC = () => {
    const SliderHeaderMenuItems: HeaderMenuItemType[] = [
        { type: 'link', title: 'vk', icon: <IconVK />, link: 'https://vk.com/thenyan' },
        { type: 'link', title: 'telega', icon: <IconTelegram />, link: 'https://t.me/thenyan' },
        { type: 'link', title: 'discord', icon: <IconDiscord />, link: 'https://discord.gg/96cq8w8' },
    ];

    return (
        <div className={styles.header}>
            <ul className={styles.header__menu}>
                {SliderHeaderMenuItems.map(MenuItem => (
                    <li>
                        <HeaderMenuItem {...MenuItem} className={styles.header__menu__item} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SliderHeader;
