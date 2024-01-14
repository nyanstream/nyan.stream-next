import Image from 'next/image';

import clsx from 'clsx';

import type { ReactComponent } from '@/types';

import { Link } from '@/components/common';

import styles from './SidebarNewsTab.module.scss';
import { ImageLain } from '@/static/images';

type PropsType = {
	className: string;
	isVisible: boolean;
};

export const SidebarNewsTab: ReactComponent<PropsType> = ({ className, isVisible }) => {
	return (
		<section className={clsx(className, styles.news)} hidden={!isVisible}>
			<div className={styles.news__status}>
				<p>
					Раздел новостей пока недоступен, но вы можете найти свежие объявления на нашем{' '}
					<Link href="https://discord.gg/96cq8w8">Discord-сервере!</Link>
				</p>

				<p>
					<Image src={ImageLain} alt="Лейн" />
				</p>
			</div>
		</section>
	);
};
