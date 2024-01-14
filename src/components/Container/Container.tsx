import { useState, useMemo, useCallback } from 'react';

import clsx from 'clsx';

import { Roboto } from 'next/font/google';

import { useRouter } from 'next/router';
import Head from 'next/head';

import {
	Title as ProjectTitle,
	Description as ProjectDescription,
	PrimeColor as ProjectColor,
	Host as ProjectHost,
	GoogleSiteVerification,
	YandexVerification,
} from '@/config';

import { useTheme } from '@/hooks';

import { ImageFavicon, ImageShare, ImageLogoTableau } from '@/static/images';

import type { ReactComponent } from '@/types';
import type { HeaderMenuItemType } from '@/components/Header/HeaderTypes';

import { Content } from '@/components/Content';
import { Slider } from '@/components/Slider';
import { Header } from '@/components/Header';

import type { MetaTag, HeadLink } from './ContainerTypes';
import styles from './Container.module.scss';

const robotoFont = Roboto({
	weight: ['400', '500'],
	variable: '--roboto-font',
	subsets: ['latin', 'cyrillic'],
});

type PropsType = {
	pageName?: string;
	leftMenuItems?: HeaderMenuItemType[];
	rightMenuItems?: HeaderMenuItemType[];
	customParentProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
};

export const Container: ReactComponent<PropsType> = props => {
	const { pageName } = props;
	const { leftMenuItems, rightMenuItems } = props;
	const { children, customParentProps } = props;

	const { Theme } = useTheme();

	const Router = useRouter();

	const [IsSliderOpen, setIsSliderOpen] = useState(false);

	const PageTitle = useMemo(
		() => `${ProjectTitle} ${pageName ? ` / ${pageName}` : ''}`.trim(),
		[pageName]
	);

	const pageTitleMetaTag = useMemo(
		(): MetaTag => ({ name: 'title', content: PageTitle }),
		[PageTitle]
	);

	const openGraphMetaTags = useMemo(
		(): MetaTag[] => [pageTitleMetaTag, ...commonOpenGraphMetaTags],
		[pageTitleMetaTag]
	);
	const twitterMetaTags = useMemo(
		(): MetaTag[] => [pageTitleMetaTag, ...commonTwitterMetaTags],
		[pageTitleMetaTag]
	);

	const headerLinks = useMemo(
		(): HeadLink[] => [
			...commonHeaderLinks,
			{ rel: 'canonical', href: `${ProjectHost}${Router.route}` },
		],
		[Router.route]
	);

	const handleSliderTriggerClick = useCallback(() => {
		setIsSliderOpen(open => !open);
	}, []);

	return (
		<>
			<Head>
				<title>{PageTitle}</title>

				{commonMetaTags.map(TagInfo => (
					<meta key={TagInfo.name} name={TagInfo.name} content={TagInfo.content} />
				))}

				{openGraphMetaTags.map(TagInfo => (
					<meta
						key={`og:${TagInfo.name}`}
						property={`og:${TagInfo.name}`}
						content={TagInfo.content}
					/>
				))}

				{twitterMetaTags.map(TagInfo => (
					<meta
						key={`twitter:${TagInfo.name}`}
						name={`twitter:${TagInfo.name}`}
						content={TagInfo.content}
					/>
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

				<link rel="manifest" href="/manifest.json" />

				{headerLinks.map(LinkInfo => (
					<link key={LinkInfo.rel} rel={LinkInfo.rel} href={LinkInfo.href} />
				))}

				{commonPreconnectHeadLinks.map(LinkInfo => (
					<link key={LinkInfo.id} rel="preconnect" href={`https://${LinkInfo.href}`} />
				))}
			</Head>

			<div
				className={clsx(styles.container, robotoFont.variable)}
				data-theme={Theme}
				{...customParentProps}>
				<Slider {...{ IsSliderOpen }} />

				<Content {...{ IsSliderOpen }} handleContentClick={handleSliderTriggerClick}>
					<Header
						{...{ pageName }}
						{...{ leftMenuItems, rightMenuItems }}
						{...{ IsSliderOpen }}
						handleSliderTriggerButtonClick={handleSliderTriggerClick}
					/>
					{children}
				</Content>
			</div>
		</>
	);
};

const commonMetaTags: MetaTag[] = [
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
	{
		name: 'yandex-tableau-widget',
		content: `logo=${ProjectHost}${ImageLogoTableau.src}, color=${ProjectColor}`,
	},
];

const commonOpenGraphMetaTags: MetaTag[] = [
	{ name: 'locale', content: 'ru_RU' },
	{ name: 'type', content: 'website' },
	{ name: 'site_name', content: ProjectTitle },
	{ name: 'url', content: ProjectHost },
	{ name: 'description', content: ProjectDescription },
	{ name: 'image', content: `${ProjectHost}${ImageShare.src}` },
];

const commonTwitterMetaTags: MetaTag[] = [
	{ name: 'description', content: ProjectDescription },
	{ name: 'card', content: 'summary_large_image' },
	{ name: 'image', content: `${ProjectHost}${ImageShare.src}` },
];

const commonHeaderLinks: HeadLink[] = [
	{ rel: 'shortcut icon', href: ImageFavicon.src },
	{ rel: 'sitemap', href: `${ProjectHost}/sitemap.xml` },
];

const commonPreconnectHeadLinks: HeadLink[] = [
	{ id: 'link_cdn', href: 'cdn.blyat.science' },
	{ id: 'link_github', href: 'nyanstream.github.io' },
	{ id: 'link_gstatic', href: 'fonts.gstatic.com' },
	{ id: 'link_weserv', href: 'images.weserv.nl' },
];
