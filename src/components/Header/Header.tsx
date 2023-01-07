import type { ReactComponent } from '@/types';

import type { HeaderMenuItemType } from './HeaderTypes';

import { IconHamburger } from '@/components/common';

import { HeaderBrand, HeaderMenuItem } from './components';

import styles from './Header.module.scss';

type PropsType = {
    pageName?: string;
    IsSliderOpen: boolean;
    leftMenuContent?: HeaderMenuItemType[];
    rightMenuContent?: HeaderMenuItemType[];
    handleSliderTriggerButtonClick: () => void;
};

export const Header: ReactComponent<PropsType> = props => {
    const { pageName, IsSliderOpen } = props;
    const { leftMenuContent = [], rightMenuContent = [] } = props;
    const { handleSliderTriggerButtonClick } = props;

    const leftMenuItems: HeaderMenuItemType[] = [
        {
            id: 'slider_trigger',
            type: 'button',
            title: 'Скрыть/показать боковое меню',
            icon: <IconHamburger />,
            onClick: IsSliderOpen ? () => void 0 : handleSliderTriggerButtonClick,
        },
        ...leftMenuContent,
    ];

    const rightMenuItems: HeaderMenuItemType[] = [...rightMenuContent];

    return (
        <header className={styles.header}>
            <ul className={`${styles.header__menu} ${styles.header__menu_left}`}>
                {leftMenuItems.map(MenuItem => (
                    <li key={MenuItem.id}>
                        <HeaderMenuItem {...MenuItem} className={styles.header__menu__item} />
                    </li>
                ))}
            </ul>

            <HeaderBrand pageName={pageName} />

            {rightMenuItems.length !== 0 ? (
                <ul className={`${styles.header__menu} ${styles.header__menu_right}`}>
                    {rightMenuItems.map(MenuItem => (
                        <li key={MenuItem.id}>
                            <HeaderMenuItem {...MenuItem} className={styles.header__menu__item} />
                        </li>
                    ))}
                </ul>
            ) : null}
        </header>
    );
};
