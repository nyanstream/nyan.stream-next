import Link from 'next/link';

import type { HeaderMenuItemType } from '../HeaderTypes';

import { IconHamburger } from '../../common';

import HeaderBrandMain from './HeaderBrandMain';
import HeaderMenuItem from './HeaderMenuItem';

import styles from './Header.module.scss';

type PropsType = {
    pageName?: string;
    leftMenuContent?: HeaderMenuItemType[];
    rightMenuContent?: HeaderMenuItemType[];
    handleSliderTriggerButtonClick: () => void;
};

const Header: React.FC<PropsType> = props => {
    const { pageName } = props;
    const { leftMenuContent = [], rightMenuContent = [] } = props;
    const { handleSliderTriggerButtonClick } = props;

    const LeftMenuItems: HeaderMenuItemType[] = [
        {
            type: 'button',
            title: 'test',
            icon: <IconHamburger />,
            onClick: handleSliderTriggerButtonClick,
        },
        ...leftMenuContent,
    ];

    const RightMenuItems: HeaderMenuItemType[] = [...rightMenuContent];

    return (
        <header className={styles.header}>
            <ul className={`${styles.header__menu} ${styles.header__menu_left}`}>
                {LeftMenuItems.map(MenuItem => (
                    <li>
                        <HeaderMenuItem {...MenuItem} className={styles.header__menu__item} />
                    </li>
                ))}
            </ul>

            <div className={styles.header__brand} data-with-pagename={pageName ? '' : null}>
                <div>
                    {pageName ? (
                        <Link href="/">
                            <HeaderBrandMain />
                        </Link>
                    ) : (
                        <HeaderBrandMain />
                    )}
                </div>
                {pageName ? (
                    <div>
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
                        <li>
                            <HeaderMenuItem {...MenuItem} className={styles.header__menu__item} />
                        </li>
                    ))}
                </ul>
            ) : null}
        </header>
    );
};

export default Header;
