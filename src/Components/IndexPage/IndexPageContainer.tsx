import { useState, useEffect, useCallback } from 'react';

import { storageGet, storageSet } from '@/utilities/storage';

import { ThemeType } from '@/components/Container/ContainerTypes';
import type { HeaderMenuItemType } from '@/components/Header/HeaderTypes';

import Container from '@/components/Container/Component/Container';

import { PlayerContainer } from 'src/Components/IndexPagePlayer';
import Sidebar from '@/components/IndexPageSidebar/Component/SidebarContainer';
import { SettingsContainer } from '@/components/IndexPageSettings';

import { PlayerSettingsContextProvider } from '@/components/providers';

import { IconRuble, IconDiscord, IconGear } from '@/components/common';
import { IconMoon, IconSun } from '@/components/common';
import { IconChevronLeft, IconChevronRight } from '@/components/common';
// import { IconChevronDown, IconChevronUp } from '@/components/common';

import styles from './IndexPage.module.scss';

const IndexPageContainer: React.FC = () => {
    const [ContainerTheme, setContainerTheme] = useState<ThemeType>('sun');
    const [IsSettingsOpen, setIsSettingsOpen] = useState(false);
    const [IsSidebarHidden, setIsSidebarHidden] = useState(false);

    useEffect(() => {
        setContainerTheme(storageGet<ThemeType>('nyan_theme', 'sun'));
    }, []);

    const handleThemeChange = useCallback((theme: ThemeType) => {
        setContainerTheme(theme);
        storageSet('nyan_theme', theme);
    }, []);

    const LeftMenuContent: HeaderMenuItemType[] = [
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

    const RightMenuContent: HeaderMenuItemType[] = [
        {
            id: 'theme_trigger',
            type: 'button',
            title: ContainerTheme === 'moon' ? 'Ночной режим' : 'Дневной режим',
            icon: ContainerTheme === 'moon' ? <IconSun /> : <IconMoon />,
            onClick: () => handleThemeChange(ContainerTheme === 'moon' ? 'sun' : 'moon'),
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
        <PlayerSettingsContextProvider>
            <Container leftMenuContent={LeftMenuContent} rightMenuContent={RightMenuContent} customParentProps={{ 'data-theme': ContainerTheme }}>
                <main className={styles.indexPage} data-is-sidebar-hidden={IsSidebarHidden ? '' : null}>
                    <PlayerContainer />

                    <Sidebar {...{ IsSidebarHidden, ContainerTheme }} />

                    {IsSettingsOpen ? <SettingsContainer {...{ handleCloseSettingsTriggerClick }} /> : null}
                </main>
            </Container>
        </PlayerSettingsContextProvider>
    );
};

export { IndexPageContainer };
