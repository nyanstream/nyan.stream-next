import { useState, useEffect, useCallback } from 'react';

import { storageGet, storageSet } from '../../utilities/storage';

import { ThemeType } from '../Container/ContainerTypes';
import type { HeaderMenuItemType } from '../Header/HeaderTypes';
import type { PlayerType } from '../IndexPagePlayer/PlayerTypes';

import Container from '../Container/Component/Container';

import Player from '../IndexPagePlayer/Component/PlayerContainer';
import Sidebar from '../IndexPageSidebar/Component/SidebarContainer';
import Settings from '../IndexPageSettings/Component/SettingsContainer';

import { IconRuble, IconDiscord, IconGear } from '../common';
import { IconMoon, IconSun } from '../common';
import { IconChevronLeft, IconChevronRight } from '../common';
// import { IconChevronDown, IconChevronUp } from '../common';

import styles from './IndexPage.module.scss';

const IndexPageContainer: React.FC = () => {
    const [ContainerTheme, setContainerTheme] = useState<ThemeType>('sun');
    const [IsSettingsOpen, setIsSettingsOpen] = useState(false);
    const [IsSidebarHidden, setIsSidebarHidden] = useState(false);

    const [SelectedPlayer, setSelectedPlayer] = useState<PlayerType>('wasd');

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

    const handlePlayerChange = useCallback((playerName: PlayerType) => {
        setSelectedPlayer(playerName);
    }, []);

    return (
        <Container leftMenuContent={LeftMenuContent} rightMenuContent={RightMenuContent} customParentProps={{ 'data-theme': ContainerTheme }}>
            <main className={styles.indexPage} data-is-sidebar-hidden={IsSidebarHidden ? '' : null}>
                <Player {...{ SelectedPlayer }} />

                <Sidebar {...{ IsSidebarHidden, ContainerTheme }} />

                {IsSettingsOpen ? (
                    <Settings {...{ IsSettingsOpen, SelectedPlayer }} {...{ handleCloseSettingsTriggerClick, handlePlayerChange }} />
                ) : null}
            </main>
        </Container>
    );
};

export default IndexPageContainer;
