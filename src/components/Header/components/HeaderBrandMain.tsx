import { useCallback, useMemo } from 'react';
import Image from 'next/image';

import clsx from 'clsx';

import { Montserrat } from 'next/font/google';

import { usePlayerSettings } from '@/hooks';

import type { ReactComponent } from '@/types';
import { ImageLogo } from '@/static/images';

import styles from './HeaderBrand.module.scss';

const IMAGE_HEIGHT = 35;
const IMAGE_WIDTH = IMAGE_HEIGHT * 2.33;

const montserratFont = Montserrat({
	weight: '700',
	variable: '--montserrat-font',
	subsets: ['latin', 'cyrillic'],
});

export const HeaderBrandMain: ReactComponent = () => {
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

	const pageTitle = useMemo(() => {
		return 'NYAN.STREAM';
	}, []);

	return (
		<div className={clsx(styles.header__brand__item, montserratFont.variable)}>
			<div className={styles.header__brand__logo}>
				<Image
					src={ImageLogo.src}
					alt="Логотип"
					width={IMAGE_WIDTH}
					height={IMAGE_HEIGHT}
					onDoubleClick={doubleClickOnBrandHandler}
				/>
			</div>

			<h1 className={`${styles.header__brand__text} ${styles.header__brand__text_title}`}>
				{pageTitle}
			</h1>
		</div>
	);
};
