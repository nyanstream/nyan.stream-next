import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';

import CONFIG from '../../../config';

import type { MetaTagType, HeadLinkType } from '../ContainerTypes';
import type { HeaderMenuItemType } from '../../Header/HeaderTypes';

import { ImageFavicon, ImageShare, ImageLogoTableau } from '../../../static/images';

import Content from '../../Content/Content';
import Slider from '../../Slider/Slider';
import Header from '../../Header/Component/Header';

import styles from './Container.module.scss';

type PropsType = {
    pageName?: string;
    leftMenuContent?: HeaderMenuItemType[];
    rightMenuContent?: HeaderMenuItemType[];
    customParentProps?: any;
};

const Container: React.FC<PropsType> = props => {
    const { pageName } = props;
    const { leftMenuContent, rightMenuContent } = props;
    const { children, customParentProps } = props;

    const { title: ProjectTitle, description: ProjectDescription, prime_color: ProjectColor, host: ProjectHost } = CONFIG;

    const Router = useRouter();

    const PageTitle = useMemo(() => `${ProjectTitle} ${pageName ? ` / ${pageName}` : ''}`, [Router.pathname]);

    const [IsSliderOpen, setIsSliderOpen] = useState<boolean>(false);

    const CommonMeta = useMemo<MetaTagType[]>(
        () => [
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'description', content: ProjectDescription },
            {
                name: 'description',
                content:
                    'nyan stream, nyanstream, нян стрим, нянстрим, anime, аниме, онлайн телевидение, online tv, аниме смотреть онлайн, мокрые котики, смотреть аниме с субтитрами',
            },
            { name: 'theme-color', content: ProjectColor },
            { name: 'google-site-verification', content: 'CZKFsMeBuqFJ1KPYIaKptrBMmgolcM3bBbu6wt1Pf_g' },
            { name: 'yandex-verification', content: 'eab231fe75b6da62' },
            { name: 'yandex-tableau-widget', content: `logo=${ProjectHost}${ImageLogoTableau}, color=${ProjectColor}` },
        ],
        []
    );

    const OpenGraphMeta = useMemo<MetaTagType[]>(
        () => [
            { name: 'locale', content: 'ru_RU' },
            { name: 'type', content: 'website' },
            { name: 'title', content: PageTitle },
            { name: 'site_name', content: ProjectTitle },
            { name: 'url', content: ProjectHost },
            { name: 'description', content: ProjectDescription },
            { name: 'image', content: `${ProjectHost}${ImageShare}` },
        ],
        [PageTitle]
    );

    const TwitterMeta = useMemo<MetaTagType[]>(
        () => [
            { name: 'title', content: PageTitle },
            { name: 'description', content: ProjectDescription },
            { name: 'card', content: 'summary_large_image' },
            { name: 'image', content: `${ProjectHost}${ImageShare}` },
        ],
        [PageTitle]
    );

    const CommonLinks = useMemo<HeadLinkType[]>(
        () => [
            { rel: 'shortcut icon', href: ImageFavicon },
            { rel: 'sitemap', href: '/sitemap.xml' },
            { rel: 'canonical', href: `${ProjectHost}${Router.pathname}` },
        ],
        [Router.pathname]
    );

    const PreconnectLinks = useMemo<HeadLinkType[]>(
        () => [
            { id: 'link_gstatic', href: 'fonts.gstatic.com' },
            { id: 'link_weserv', href: 'images.weserv.nl' },
        ],
        []
    );

    const handleSliderTriggerButtonClick = () => {
        setIsSliderOpen(!IsSliderOpen);
    };

    const handleContentClick = () => {
        setIsSliderOpen(!IsSliderOpen);
    };

    return (
        <>
            <Head>
                <title>{PageTitle}</title>
                {CommonMeta.map(TagInfo => (
                    <meta key={TagInfo.name} name={TagInfo.name} content={TagInfo.content} />
                ))}
                {OpenGraphMeta.map(TagInfo => (
                    <meta key={`og:${TagInfo.name}`} property={`og:${TagInfo.name}`} content={TagInfo.content} />
                ))}
                {TwitterMeta.map(TagInfo => (
                    <meta key={`twitter:${TagInfo.name}`} name={`twitter:${TagInfo.name}`} content={TagInfo.content} />
                ))}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            url: ProjectHost,
                            name: ProjectTitle,
                            description: ProjectDescription,
                        }),
                    }}
                />
                {CommonLinks.map(LinkInfo => (
                    <link key={LinkInfo.rel} rel={LinkInfo.rel} href={LinkInfo.href} />
                ))}
                {PreconnectLinks.map(LinkInfo => (
                    <link key={LinkInfo.id} rel="preconnect" href={`https://${LinkInfo.href}`} />
                ))}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400;500&display=swap" />
            </Head>

            <div className={styles.container} {...customParentProps}>
                <Slider {...{ IsSliderOpen }} />
                <Content {...{ IsSliderOpen }} {...{ handleContentClick }}>
                    <Header
                        {...{ pageName }}
                        {...{ leftMenuContent, rightMenuContent }}
                        {...{ IsSliderOpen }}
                        {...{ handleSliderTriggerButtonClick }}
                    />
                    {children}
                </Content>
            </div>
        </>
    );
};

export default Container;
