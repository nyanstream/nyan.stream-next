import type { ReactComponent } from '@/types';
import clsx from 'clsx';

import { HeaderMenuItemType } from '@/components/Header/HeaderTypes';
import { HeaderMenuItem } from '@/components/Header/components';

import { IconGithub } from '@/components/common';

import styles from './Slider.module.scss';
import headerStyles from '@/components/Header/Header.module.scss';

export const SliderHeader: ReactComponent = () => {
    const SliderHeaderMenuItems: HeaderMenuItemType[] = [
        {
            id: 'link_github',
            type: 'link',
            title: 'Исходники на GitHub',
            icon: <IconGithub />,
            link: 'https://github.com/nyanstream',
        },
    ];

    return (
        <div className={clsx(styles.slider__header, headerStyles.header)}>
            <ul className={clsx(headerStyles.header__menu, styles.slider__header__menu)}>
                {SliderHeaderMenuItems.map(MenuItem => (
                    <li key={MenuItem.id} className={headerStyles.header__menu__item}>
                        <HeaderMenuItem {...MenuItem} className={headerStyles.header__menu__button} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
