import { useCallback, useMemo } from 'react';
import Image from 'next/image';

import { usePlayerSettings } from '@/hooks';

import type { ReactComponent } from '@/utilities/types';
import { ImageLogo } from '@/static/images';

import styles from './Header.module.scss';

const IMAGE_SIZE = 35;

const HeaderBrandMain: ReactComponent = () => {
    const { PlayerNodeRef } = usePlayerSettings();

    // перезагрузка плеера по двойному клику на логотип
    const doubleClickOnBrandHandler = useCallback(() => {
        if (PlayerNodeRef.current) {
            const PlayerFrame = PlayerNodeRef.current.querySelector('iframe');

            if (PlayerFrame) {
                PlayerFrame.src = PlayerFrame.src;
            }
        }
    }, [PlayerNodeRef]);

    const PageTitle = useMemo(() => {
        return 'NYAN.STREAM';
    }, []);

    return (
        <div className={styles.header__brand__item}>
            <div className={styles.header__brand__logo}>
                <Image
                    src={ImageLogo.src}
                    alt="Логотип"
                    layout="raw"
                    width={IMAGE_SIZE}
                    height={IMAGE_SIZE}
                    onDoubleClick={doubleClickOnBrandHandler}
                />
            </div>
            <h1 className={`${styles.header__brand__text} ${styles.header__brand__text_title}`}>{PageTitle}</h1>
        </div>
    );
};

export default HeaderBrandMain;
