import { useCallback, useMemo } from 'react';

import { ImageLogo } from '../../../static/images';

import styles from './Header.module.scss';

const HeaderBrandMain: React.FC = () => {
    // перезагрузка плеера по двойному клику на логотип
    const doubleClickOnBrandHandler = useCallback(() => {
        const PlayerNode = document.querySelector('[data-player]');

        if (PlayerNode) {
            const PlayerFrame = PlayerNode.querySelector('iframe');

            if (PlayerFrame) {
                PlayerFrame.src = PlayerFrame.src;
            }
        }
    }, []);

    const PageTitle = useMemo(() => {
        const OriginalTitle = 'NYAN.STREAM';

        if (typeof window === 'undefined') return OriginalTitle;

        const IsIndexPage = window.location.pathname === '/';

        if (IsIndexPage) return '#нетВойне';
        return OriginalTitle;
    }, []);

    return (
        <div className={styles.header__brand__item}>
            <div className={styles.header__brand__logo}>
                <img src={ImageLogo.src} alt="Логотип" data-lang-image="logo" onDoubleClick={doubleClickOnBrandHandler} />
            </div>
            <h1 className={`${styles.header__brand__text} ${styles.header__brand__text_title}`}>{PageTitle}</h1>
        </div>
    );
};

export default HeaderBrandMain;
