import { useState, useCallback } from 'react';

import type { ReactComponent } from '@/types';

import type { HeaderMenuItemType } from '@/components/Header/HeaderTypes';

import { Container } from '@/components/Container';

import { PlayerContainer } from '@/components/IndexPagePlayer';
import { SidebarContainer } from '@/components/IndexPageSidebar';
import { SettingsContainer } from '@/components/IndexPageSettings';

import { useTheme } from '@/hooks';

import { IconRuble, IconDiscord, IconGear } from '@/components/common';
import { IconMoon, IconSun } from '@/components/common';
import { IconChevronLeft, IconChevronRight } from '@/components/common';

import styles from './IndexPage.module.scss';

export const IndexPageContainer: ReactComponent = () => {
    const [IsSettingsOpen, setIsSettingsOpen] = useState(false);
    const [IsSidebarHidden, setIsSidebarHidden] = useState(false);

    const { Theme, setTheme } = useTheme();

    const rightMenuItems: HeaderMenuItemType[] = [
        {
            id: 'theme_trigger',
            type: 'button',
            title: Theme === 'moon' ? 'Ночной режим' : 'Дневной режим',
            icon: Theme === 'moon' ? <IconSun /> : <IconMoon />,
            onClick: () => setTheme(Theme === 'moon' ? 'sun' : 'moon'),
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

    const handleCloseSettingsTriggerClick = useCallback(() => {
        setIsSettingsOpen(false);
    }, []);

    return (
        <Container leftMenuItems={leftMenuItems} rightMenuItems={rightMenuItems}>
            <main className={styles.indexPage} data-is-sidebar-hidden={IsSidebarHidden ? '' : null}>
                <PlayerContainer />

                <SidebarContainer {...{ IsSidebarHidden }} />

                {IsSettingsOpen ? <SettingsContainer {...{ handleCloseSettingsTriggerClick }} /> : null}
            </main>
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
