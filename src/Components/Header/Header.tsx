import Link from 'next/link';

import { IconHamburger } from '../common';

import ImageLogo from '../../../static/images/logo.svg';

import styles from './Header.module.scss';

type MenuContentItem = {
    type: 'button' | 'link';
    title: string;
    icon: JSX.Element;
    link?: string;
    onClick?: () => void;
};

type PropsType = {
    pageName?: string;
    leftMenuContent?: MenuContentItem[];
    rightMenuContent?: MenuContentItem[];
};

const HeaderBrandMain: React.FC = () => {
    return (
        <>
            <div className={styles.header__brand__logo}>
                <img src={ImageLogo} alt="Логотип" data-lang-image="logo" />
            </div>
            <h1 className={styles.header__brand__text}>NYAN.STREAM</h1>
        </>
    );
};

const Header: React.FC<PropsType> = props => {
    const { pageName } = props;
    const { leftMenuContent = [], rightMenuContent = [] } = props;

    const LeftMenuItems: MenuContentItem[] = [
        {
            type: 'button',
            title: 't',
            icon: <IconHamburger />,
            onClick: () => void 0,
        },
        ...leftMenuContent,
    ];

    const RightMenuItems: MenuContentItem[] = [...rightMenuContent];

    return (
        <header className={styles.header}>
            <ul className={`${styles.header__menu} ${styles.header__menu_left}`}>
                {LeftMenuItems.map(MenuItem => (
                    <li>{MenuItem.icon}</li>
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

            <ul className={`${styles.header__menu} ${styles.header__menu_right}`}>
                {RightMenuItems.map(MenuItem => (
                    <li>{MenuItem.icon}</li>
                ))}
            </ul>
        </header>
    );
};

export default Header;
