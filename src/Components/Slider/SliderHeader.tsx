import { HeaderMenuItemType } from '../Header/HeaderTypes';

import HeaderMenuItem from '../Header/Component/HeaderMenuItem';

import { IconVK, IconTelegram, IconDiscord, IconGithub } from '../common';

import styles from './Slider.module.scss';
import headerStyles from '../Header/Component/Header.module.scss';

const SliderHeader: React.FC = () => {
    const SliderHeaderMenuItems: HeaderMenuItemType[] = [
        {
            id: 'link_github',
            type: 'link',
            title: 'Профиль на GitHub',
            icon: <IconGithub />,
            link: 'https://github.com/nyanstream',
        },
        {
            id: 'vk_link',
            type: 'link',
            title: 'Сообщество в VK',
            icon: <IconVK />,
            link: 'https://vk.com/thenyan',
        },
        {
            id: 'telega_link',
            type: 'link',
            title: 'Канал в Telegram',
            icon: <IconTelegram />,
            link: 'https://t.me/thenyan',
        },
        {
            id: 'discord_link',
            type: 'link',
            title: 'Сервер в Discord',
            icon: <IconDiscord />,
            link: 'https://discord.gg/96cq8w8',
        },
    ];

    return (
        <div className={`${headerStyles.header} ${styles.slider__header}`}>
            <ul className={`${headerStyles.header__menu} ${styles.slider__header__menu}`}>
                {SliderHeaderMenuItems.map(MenuItem => (
                    <li key={MenuItem.id}>
                        <HeaderMenuItem {...MenuItem} className={headerStyles.header__menu__item} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SliderHeader;
