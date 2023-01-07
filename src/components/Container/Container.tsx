import { useState, useMemo, useCallback } from 'react';

import clsx from 'clsx';

import { Roboto } from '@next/font/google';

import { useRouter } from 'next/router';
import Head from 'next/head';

import {
    Title as ProjectTitle,
    Description as ProjectDescription,
    PrimeColor as ProjectColor,
    Host as ProjectHost,
    GoogleSiteVerification,
    YandexVerification,
    ContentSecurityPolicy,
} from '@/config';

import { useTheme } from '@/hooks';

import type { MetaTagType, HeadLinkType } from './ContainerTypes';
import type { ReactComponent } from '@/utilities/types';
import type { HeaderMenuItemType } from '@/components/Header/HeaderTypes';

import { ImageFavicon, ImageShare, ImageLogoTableau } from '@/static/images';

import Content from '@/components/Content/Content';
import Slider from '@/components/Slider/Slider';
import Header from '@/components/Header/Component/Header';

import styles from './Container.module.scss';

const robotoFont = Roboto({ weight: ['400', '500'], variable: '--roboto-font' });

type PropsType = {
    pageName?: string;
    leftMenuContent?: HeaderMenuItemType[];
    rightMenuContent?: HeaderMenuItemType[];
    customParentProps?: Record<string, any>;
};

const Container: ReactComponent<PropsType> = props => {
    const { pageName } = props;
    const { leftMenuContent, rightMenuContent } = props;
    const { children, customParentProps } = props;

    const { Theme } = useTheme();

    const Router = useRouter();

    const PageTitle = useMemo(() => `${ProjectTitle} ${pageName ? ` / ${pageName}` : ''}`, [pageName]);

    const [IsSliderOpen, setIsSliderOpen] = useState(false);

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
            { name: 'google-site-verification', content: GoogleSiteVerification },
            { name: 'yandex-verification', content: YandexVerification },
            { name: 'yandex-tableau-widget', content: `logo=${ProjectHost}${ImageLogoTableau.src}, color=${ProjectColor}` },
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
            { name: 'image', content: `${ProjectHost}${ImageShare.src}` },
        ],
        [PageTitle]
    );

    const TwitterMeta = useMemo<MetaTagType[]>(
        () => [
            { name: 'title', content: PageTitle },
            { name: 'description', content: ProjectDescription },
            { name: 'card', content: 'summary_large_image' },
            { name: 'image', content: `${ProjectHost}${ImageShare.src}` },
        ],
        [PageTitle]
    );

    const CommonLinks = useMemo<HeadLinkType[]>(
        () => [
            { rel: 'shortcut icon', href: ImageFavicon.src },
            { rel: 'sitemap', href: `${ProjectHost}/sitemap.xml` },
            { rel: 'canonical', href: `${ProjectHost}${Router.route}` },
        ],
        [Router.route]
    );

    const PreconnectLinks = useMemo<HeadLinkType[]>(
        () => [
            { id: 'link_cdn', href: 'cdn.blyat.science' },
            { id: 'link_github', href: 'nyanstream.github.io' },
            { id: 'link_gstatic', href: 'fonts.gstatic.com' },
            { id: 'link_weserv', href: 'images.weserv.nl' },
        ],
        []
    );

    const handleSliderTriggerButtonClick = useCallback(() => {
        setIsSliderOpen(!IsSliderOpen);
    }, [IsSliderOpen]);

    const handleContentClick = useCallback(() => {
        setIsSliderOpen(!IsSliderOpen);
    }, [IsSliderOpen]);

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

                <meta httpEquiv="Content-Security-Policy" content={ContentSecurityPolicy} />

                {CommonLinks.map(LinkInfo => (
                    <link key={LinkInfo.rel} rel={LinkInfo.rel} href={LinkInfo.href} />
                ))}

                {PreconnectLinks.map(LinkInfo => (
                    <link key={LinkInfo.id} rel="preconnect" href={`https://${LinkInfo.href}`} />
                ))}
            </Head>

            <div className={clsx(styles.container, robotoFont.variable)} data-theme={Theme} {...customParentProps}>
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

export { Container };
