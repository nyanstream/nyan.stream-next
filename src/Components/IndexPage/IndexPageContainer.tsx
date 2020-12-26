import { useState, useEffect } from 'react';

import { storageGet, storageSet } from '../../utilities/storage';

import { ThemeType } from '../Container/ContainerTypes';
import type { HeaderMenuItemType } from '../Header/HeaderTypes';
import type { PlayerType } from '../IndexPagePlayer/PlayerTypes';

import Container from '../Container/Component/Container';

import Player from '../IndexPagePlayer/Component/PlayerContainer';
import Sidebar from '../IndexPageSidebar/Component/SidebarContainer';
import Settings from '../IndexPageSettings/Component/SettingsContainer';

import { IconRuble, IconGear } from '../common';
import { IconMoon, IconSun } from '../common';
import { IconChevronLeft, IconChevronRight } from '../common';
import { IconChevronDown, IconChevronUp } from '../common';

import styles from './IndexPage.module.scss';

const IndexPageContainer: React.FC = () => {
    const [ContainerTheme, setContainerTheme] = useState<ThemeType>('sun');
    const [IsSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const [IsSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);

    const [SelectedPlayer, setSelectedPlayer] = useState<PlayerType>('wasd');

    useEffect(() => {
        setContainerTheme(storageGet<ThemeType>('nyan_theme', 'sun'));
    }, []);

    const handleThemeChange = (theme: ThemeType) => {
        setContainerTheme(theme);
        storageSet('nyan_theme', theme);
    };

    const LeftMenuContent: HeaderMenuItemType[] = [
        {
            id: 'link_donate',
            type: 'link',
            title: 'Поддержать проект',
            icon: <IconRuble />,
            link: 'https://www.donationalerts.ru/r/thenyan',
        },
    ];

    const RightMenuContent: HeaderMenuItemType[] = [
        {
            id: 'theme_trigger',
            type: 'button',
            title: ContainerTheme === 'moon' ? 'Ночной режим' : 'Дневной режим',
            icon: ContainerTheme === 'moon' ? <IconSun /> : <IconMoon />,
            onClick: () => (ContainerTheme === 'moon' ? handleThemeChange('sun') : handleThemeChange('moon')),
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

    const handleCloseSettingsTriggerClick = () => {
        setIsSettingsOpen(false);
    };

    const handlePlayerChange = (playerName: PlayerType) => {
        setSelectedPlayer(playerName);
    };

    return (
        <Container leftMenuContent={LeftMenuContent} rightMenuContent={RightMenuContent} customParentProps={{ 'data-theme': ContainerTheme }}>
            <main className={styles.indexPage} data-is-sidebar-hidden={IsSidebarHidden ? '' : null}>
                <Player {...{ SelectedPlayer }} />
                <Sidebar {...{ IsSidebarHidden }} />
                {IsSettingsOpen ? (
                    <Settings {...{ IsSettingsOpen, SelectedPlayer }} {...{ handleCloseSettingsTriggerClick, handlePlayerChange }} />
                ) : null}
            </main>
        </Container>
    );
};

export default IndexPageContainer;
