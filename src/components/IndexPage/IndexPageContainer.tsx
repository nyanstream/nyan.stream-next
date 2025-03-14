import React from 'react';

import type { ReactComponent } from '@/types';

import type { HeaderMenuItemType } from '@/components/Header/HeaderTypes';

import { Container } from '@/components/Container';

import { NewYearSnowContextProvider } from '@/providers';

import { PlayerContainer } from '@/components/IndexPagePlayer';
import { SidebarContainer } from '@/components/IndexPageSidebar';
import { SettingsContainer } from '@/components/IndexPageSettings';

import { useTheme } from '@/hooks';

import { IconRuble, IconDiscord, IconGear } from '@/components/common';
import { IconMoon, IconSun } from '@/components/common';
import { IconChevronLeft, IconChevronRight } from '@/components/common';

import { NewYearSnow } from '../NewYearSnow';

import styles from './IndexPage.module.scss';

export const IndexPageContainer: ReactComponent = () => {
	const [IsSettingsOpen, setIsSettingsOpen] = React.useState(false);
	const [IsSidebarHidden, setIsSidebarHidden] = React.useState(false);

	const { Theme, switchTheme } = useTheme();

	const rightMenuItems: HeaderMenuItemType[] = [
		{
			id: 'theme_trigger',
			type: 'button',
			title: Theme === 'moon' ? 'Ночной режим' : 'Дневной режим',
			icon: Theme === 'moon' ? <IconSun /> : <IconMoon />,
			onClick: () => switchTheme(),
		},
		{
			id: 'settings_trigger',
			type: 'button',
			title: 'Открыть настройки',
			icon: <IconGear />,
			onClick: () => setIsSettingsOpen(true),
		},
		{
			id: 'sidebar_trigger',
			type: 'button',
			title: IsSidebarHidden ? 'Показать боковую панель' : 'Скрыть боковую панель',
			icon: IsSidebarHidden ? <IconChevronLeft /> : <IconChevronRight />,
			onClick: () => setIsSidebarHidden(!IsSidebarHidden),
		},
	];

	const handleCloseSettingsTriggerClick = React.useCallback(() => {
		setIsSettingsOpen(false);
	}, []);

	return (
		<Container leftMenuItems={leftMenuItems} rightMenuItems={rightMenuItems}>
			<NewYearSnowContextProvider>
				<main className={styles.indexPage} data-is-sidebar-hidden={IsSidebarHidden ? '' : null}>
					<PlayerContainer />

					<SidebarContainer {...{ IsSidebarHidden }} />

					{IsSettingsOpen ? <SettingsContainer {...{ handleCloseSettingsTriggerClick }} /> : null}
				</main>

				<NewYearSnow />
			</NewYearSnowContextProvider>
		</Container>
	);
};

const leftMenuItems: HeaderMenuItemType[] = [
	{
		id: 'link_donate',
		type: 'link',
		title: 'Поддержать проект',
		icon: <IconRuble />,
		link: 'https://www.donationalerts.ru/r/thenyan',
	},
	{
		id: 'discord_link',
		type: 'link',
		title: 'Сервер в Discord',
		icon: <IconDiscord />,
		link: 'https://discord.gg/96cq8w8',
	},
];
