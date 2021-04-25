import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import SliderHeader from './SliderHeader';

import styles from './Slider.module.scss';

type PropsType = {
    IsSliderOpen: boolean;
};

const Slider: React.FC<PropsType> = props => {
    const { IsSliderOpen } = props;

    const Router = useRouter();

    const IsIndexPage = useMemo(() => Router.pathname === '/' || Router.pathname === '/index', [Router.pathname]);

    const SliderLinks: {
        id: string;
        title: string;
        link: string;
        offset?: boolean;
    }[] = [
        {
            id: 'donate',
            title: 'Поддержать проект',
            link: 'https://www.donationalerts.ru/r/thenyan',
            offset: !IsIndexPage,
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
            id: 'link_shiki',
            title: 'Профиль на Shikimori',
            link: 'https://shikimori.one/nyan/list/anime/order-by/name',
            offset: true,
        },
        {
            id: 'ling_trakt',
            title: 'Профиль на Trakt.tv',
            link: 'https://trakt.tv/users/thenyan/history',
        },
        {
            id: 'link_ag',
            title: 'Профиль на AG',
            link: 'https://ag.ru/@nya/games',
        },
    ];

    return (
        <div className={styles.slider} data-is-slider-open={IsSliderOpen ? '' : null}>
            <SliderHeader />
            <div className={styles.slider__content}>
                <ul className={styles.slider__links}>
                    {!IsIndexPage ? (
                        <li className={styles.slider__links__item}>
                            <Link href="/">Перейти на главную</Link>
                        </li>
                    ) : null}
                    {SliderLinks.map(LinkData => (
                        <li key={LinkData.id} className={styles.slider__links__item} data-offset={LinkData.offset ? '' : null}>
                            <a href={LinkData.link} target="_blank" rel="nofollow noopener noreferrer">
                                {LinkData.title}
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
                    {IsIndexPage ? (
                        <p style={{ marginTop: 5 }}>
                            <Link href="/about">о проекте</Link>
                        </p>
                    ) : null}
                </footer>
            </div>
        </div>
    );
};

export default Slider;
