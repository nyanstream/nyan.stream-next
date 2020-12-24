import Link from 'next/link';

import type { HeaderMenuItemType } from '../HeaderTypes';

import { IconHamburger } from '../../common';

import HeaderBrandMain from './HeaderBrandMain';
import HeaderMenuItem from './HeaderMenuItem';

import styles from './Header.module.scss';

type PropsType = {
    pageName?: string;
    IsSliderOpen: boolean;
    leftMenuContent?: HeaderMenuItemType[];
    rightMenuContent?: HeaderMenuItemType[];
    handleSliderTriggerButtonClick: () => void;
};

const Header: React.FC<PropsType> = props => {
    const { pageName, IsSliderOpen } = props;
    const { leftMenuContent = [], rightMenuContent = [] } = props;
    const { handleSliderTriggerButtonClick } = props;

    const LeftMenuItems: HeaderMenuItemType[] = [
        {
            id: 'slider_trigger',
            type: 'button',
            title: 'Скрыть/показать боковое меню',
            icon: <IconHamburger />,
            onClick: IsSliderOpen ? () => void 0 : handleSliderTriggerButtonClick,
        },
        ...leftMenuContent,
    ];

    const RightMenuItems: HeaderMenuItemType[] = [...rightMenuContent];

    return (
        <header className={styles.header}>
            <ul className={`${styles.header__menu} ${styles.header__menu_left}`}>
                {LeftMenuItems.map(MenuItem => (
                    <li key={MenuItem.id}>
                        <HeaderMenuItem {...MenuItem} className={styles.header__menu__item} />
                    </li>
                ))}
            </ul>

            <div className={styles.header__brand} data-with-pagename={pageName ? '' : null}>
                <div>
                    {pageName ? (
                        <Link href="/" passHref>
                            <a>
                                <HeaderBrandMain />
                            </a>
                        </Link>
                    ) : (
                        <HeaderBrandMain />
                    )}
                </div>
                {pageName ? (
                    <div className={styles.header__brand__item}>
                        <span className={styles.header__brand__text} data-style="no-hover">
                            &nbsp;/&nbsp;
                        </span>
                        <span className={styles.header__brand__text}>{pageName}</span>
                    </div>
                ) : null}
            </div>

            {RightMenuItems.length !== 0 ? (
                <ul className={`${styles.header__menu} ${styles.header__menu_right}`}>
                    {RightMenuItems.map(MenuItem => (
                        <li key={MenuItem.id}>
                            <HeaderMenuItem {...MenuItem} className={styles.header__menu__item} />
                        </li>
                    ))}
                </ul>
            ) : null}
        </header>
    );
};

export default Header;
