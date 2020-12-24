import { useState } from 'react';

import type { HeaderMenuItemType } from '../Header/HeaderTypes';

import Container from '../Container/Container';

import Player from './Player/PlayerContainer';
import Sidebar from './Sidebar/SidebarContainer';
import Settings from './Settings/SettingsContainer';

import { IconRuble, IconGear } from '../common';
import { IconMoon, IconSun } from '../common';
import { IconChevronLeft, IconChevronRight } from '../common';

import styles from './IndexPage.module.scss';

const IndexPageContainer: React.FC = () => {
    const [IsMoonThemeEnabled, setIsMoonThemeEnabled] = useState<boolean>(false);
    const [IsSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const [IsSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);

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
            title: IsMoonThemeEnabled ? 'Ночной режим' : 'Дневной режим',
            icon: IsMoonThemeEnabled ? <IconSun /> : <IconMoon />,
            onClick: () => setIsMoonThemeEnabled(!IsMoonThemeEnabled),
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

    return (
        <Container leftMenuContent={LeftMenuContent} rightMenuContent={RightMenuContent}>
            <main className={styles.index}>
                <Player />
                <Sidebar />
                <Settings {...{ IsSettingsOpen }} />
            </main>
        </Container>
    );
};

export default IndexPageContainer;
