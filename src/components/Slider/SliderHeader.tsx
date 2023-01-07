import type { ReactComponent } from '@/types';

import { HeaderMenuItemType } from '@/components/Header/HeaderTypes';
import { HeaderMenuItem } from '@/components/Header/components';

import { IconVK, IconTelegram, IconGithub } from '@/components/common';

import styles from './Slider.module.scss';
import headerStyles from '@/components/Header/Header.module.scss';

export const SliderHeader: ReactComponent = () => {
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
