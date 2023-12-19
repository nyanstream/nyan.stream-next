import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import type { ReactComponent } from '@/types';

import { SliderHeader } from './SliderHeader';

import type { SliderLink } from './types';

import styles from './Slider.module.scss';

type PropsType = {
    IsSliderOpen: boolean;
};

export const Slider: ReactComponent<PropsType> = props => {
    const { IsSliderOpen } = props;

    const router = useRouter();

    const isIndexPage = useMemo(() => router.pathname === '/' || router.pathname === '/index', [router.pathname]);

    const links: SliderLink[] = useMemo(() => {
        return [
            {
                id: 'donate',
                title: 'Поддержать проект',
                link: 'https://www.donationalerts.ru/r/thenyan',
                offset: !isIndexPage,
            },
            {
                id: 'donate_report',
                title: 'Посмотреть отчёты',
                link: 'https://docs.google.com/spreadsheets/d/1EqvBfoaMvK4rUisp4--MbRIih7r17HGMu1t501bjHkE',
            },
            {
                id: 'request',
                title: 'Сделать реквест',
                link: 'https://docs.google.com/forms/d/e/1FAIpQLScbdpIEimhG1Ouq6O8hOeRJhqMGrggOaT0IDO7hbtxl0Wm4Xw/viewform',
                offset: true,
            },
            {
                id: 'requests_view',
                title: 'Посмотреть реквесты',
                link: 'https://docs.google.com/spreadsheets/d/1u_iqJh17DjxPCEms_600-vFUNmDoKrD_fsk-PsiR3l8',
            },
            {
                id: 'link_discord',
                title: 'Discord-сервер',
                link: 'https://discord.gg/96cq8w8',
                offset: true,
            },
            {
                id: 'link_github',
                title: 'Исходники на GitHub',
                link: 'https://github.com/nyanstream',
            },
        ];
    }, [isIndexPage]);

    return (
        <div className={styles.slider} data-is-slider-open={IsSliderOpen ? '' : null}>
            <SliderHeader />

            <div className={styles.slider__content}>
                <ul className={styles.slider__links}>
                    {!isIndexPage ? (
                        <li className={styles.slider__links__item}>
                            <Link href="/">Перейти на главную</Link>
                        </li>
                    ) : null}

                    {links.map(Link => (
                        <li key={Link.id} className={styles.slider__links__item} data-offset={Link.offset ? '' : null}>
                            <a href={Link.link} target="_blank" rel="nofollow noopener noreferrer">
                                {Link.title}
                            </a>
                        </li>
                    ))}
                </ul>

                <footer className={styles.slider__footer}>
                    <p>
                        <Link href="/">NYAN.STREAM</Link> © {new Date().getFullYear()}
                    </p>

                    <p>
                        <span>сделано с</span> <span className={styles.slider__footer__heart}>♥</span>
                    </p>

                    {isIndexPage ? (
                        <p style={{ marginTop: 5 }}>
                            <Link href="/about">о проекте</Link>
                        </p>
                    ) : null}
                </footer>
            </div>
        </div>
    );
};
