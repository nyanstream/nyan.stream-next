import { useState, useCallback } from 'react';

import type { SidebarTabType } from '../SidebarTypes';
import type { ThemeType } from '../../Container/ContainerTypes';

import SidebarRadioButtons from '../SidebarRadioButtons/SidebarRadioButtons';
import SidebarChatTab from '../SidebarChatTab/SidebarChatTab';
import SidebarScheduleTab from '../SidebarScheduleTab/SidebarScheduleTab';
import SidebarNewsTab from '../SidebarNewsTab/SidebarNewsTab';

import styles from './Sidebar.module.scss';

type PropsType = {
    IsSidebarHidden: boolean;
    ContainerTheme: ThemeType;
};

const SidebarContainer: React.FC<PropsType> = props => {
    const { IsSidebarHidden, ContainerTheme } = props;

    const [CurrentSidebarTab, setCurrentSidebarTab] = useState<SidebarTabType>('chat');

    const handleSidebarRadioButtonClick = useCallback((tabName: SidebarTabType) => {
        setCurrentSidebarTab(tabName);
    }, []);

    return (
        <aside className={styles.sidebar} data-theme={ContainerTheme} hidden={IsSidebarHidden}>
            <SidebarRadioButtons {...{ CurrentSidebarTab }} {...{ handleSidebarRadioButtonClick }} />

            <div className={styles.sidebar__tabs}>
                <SidebarChatTab className={styles.sidebar__tabs__tab} isVisible={CurrentSidebarTab === 'chat'} />

                <SidebarScheduleTab className={styles.sidebar__tabs__tab} isVisible={CurrentSidebarTab === 'schedule'} {...{ ContainerTheme }} />

                <SidebarNewsTab className={styles.sidebar__tabs__tab} isVisible={CurrentSidebarTab === 'news'} />
            </div>
        </aside>
    );
};

export default SidebarContainer;
