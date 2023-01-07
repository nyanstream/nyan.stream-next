import { useCallback, useMemo } from 'react';
import Image from 'next/image';

import clsx from 'clsx';

import { Montserrat } from '@next/font/google';

import { usePlayerSettings } from '@/hooks';

import type { ReactComponent } from '@/utilities/types';
import { ImageLogo } from '@/static/images';

import styles from './Header.module.scss';

const IMAGE_SIZE = 35;

const montserratFont = Montserrat({ weight: '700', variable: '--montserrat-font' });

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
        <div className={clsx(styles.header__brand__item, montserratFont.variable)}>
            <div className={styles.header__brand__logo}>
                <Image src={ImageLogo.src} alt="Логотип" width={IMAGE_SIZE} height={IMAGE_SIZE} onDoubleClick={doubleClickOnBrandHandler} />
            </div>
            <h1 className={`${styles.header__brand__text} ${styles.header__brand__text_title}`}>{PageTitle}</h1>
        </div>
    );
};

export default HeaderBrandMain;
