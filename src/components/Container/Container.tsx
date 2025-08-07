import { useState, useMemo, useCallback } from 'react';

import clsx from 'clsx';

import { Roboto } from 'next/font/google';

import { useRouter } from 'next/router';
import Head from 'next/head';

import * as config from '@/config';

import { useTheme } from '@/hooks';

import { ImageFavicon, ImageShare, ImageLogoTableau } from '@/static/images';

import type { ReactComponent } from '@/types';
import type { HeaderMenuItemType } from '@/components/Header/HeaderTypes';

import { Content } from '@/components/Content';
import { Slider } from '@/components/Slider';
import { Header } from '@/components/Header';

import type { MetaTag, HeadLink } from './ContainerTypes';
import styles from './Container.module.scss';

console.log({ config })

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
		() => `${config.TITLE} ${pageName ? ` / ${pageName}` : ''}`.trim(),
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
			{ rel: 'canonical', href: new URL(Router.route, config.APP_PUBLIC_URL).href },
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
							url: config.APP_PUBLIC_URL,
							name: config.TITLE,
							description: config.DESCRIPTION,
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
	{ name: 'description', content: config.DESCRIPTION },
	{
		name: 'description',
		content:
			'nyan stream, nyanstream, нян стрим, нянстрим, anime, аниме, онлайн телевидение, online tv, аниме смотреть онлайн, мокрые котики, смотреть аниме с субтитрами',
	},
	{ name: 'theme-color', content: config.APP_PRIME_COLOR },
	{ name: 'google-site-verification', content: config.GOOGLE_SITE_VERIFICATION_TAG },
	{ name: 'yandex-verification', content: config.YANDEX_SITE_VERIFICATION_TAG },
	{
		name: 'yandex-tableau-widget',
		content: `logo=${new URL(ImageLogoTableau.src, config.APP_PUBLIC_URL).href}, color=${config.APP_PRIME_COLOR}`,
	},
];

const commonOpenGraphMetaTags: MetaTag[] = [
	{ name: 'locale', content: 'ru_RU' },
	{ name: 'type', content: 'website' },
	{ name: 'site_name', content: config.TITLE },
	{ name: 'url', content: config.APP_PUBLIC_URL },
	{ name: 'description', content: config.DESCRIPTION },
	{ name: 'image', content: new URL(ImageShare.src, config.APP_PUBLIC_URL).href },
];

const commonTwitterMetaTags: MetaTag[] = [
	{ name: 'description', content: config.DESCRIPTION },
	{ name: 'card', content: 'summary_large_image' },
	{ name: 'image', content: new URL(ImageShare.src, config.APP_PUBLIC_URL).href },
];

const commonHeaderLinks: HeadLink[] = [
	{ rel: 'shortcut icon', href: ImageFavicon.src },
	{ rel: 'sitemap', href: new URL('sitemap.xml', config.APP_PUBLIC_URL).href },
];

const commonPreconnectHeadLinks: HeadLink[] = [
	{ id: 'link_cdn', href: 'cdn.blyat.science' },
	{ id: 'link_github', href: 'nyanstream.github.io' },
	{ id: 'link_gstatic', href: 'fonts.gstatic.com' },
	{ id: 'link_weserv', href: 'images.weserv.nl' },
];
