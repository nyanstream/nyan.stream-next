import { useState, useCallback } from 'react';

import type { SidebarTabType } from './SidebarTypes';

import { useTheme } from '@/hooks';

import SidebarRadioButtons from './SidebarRadioButtons/SidebarRadioButtons';
import SidebarChatTab from './SidebarChatTab/SidebarChatTab';
import SidebarScheduleTab from './SidebarScheduleTab/SidebarScheduleTab';
import SidebarNewsTab from './SidebarNewsTab/SidebarNewsTab';

import styles from './Sidebar.module.scss';

type PropsType = {
    IsSidebarHidden: boolean;
};

const SidebarContainer: React.FC<PropsType> = props => {
    const { IsSidebarHidden } = props;

    const { Theme } = useTheme();

    const [CurrentSidebarTab, setCurrentSidebarTab] = useState<SidebarTabType>('chat');

    const handleSidebarRadioButtonClick = useCallback((tabName: SidebarTabType) => {
        setCurrentSidebarTab(tabName);
    }, []);

    return (
        <aside className={styles.sidebar} data-theme={Theme} hidden={IsSidebarHidden}>
            <SidebarRadioButtons {...{ CurrentSidebarTab }} {...{ handleSidebarRadioButtonClick }} />

            <div className={styles.sidebar__tabs}>
                <SidebarChatTab className={styles.sidebar__tabs__tab} isVisible={CurrentSidebarTab === 'chat'} />

                <SidebarScheduleTab className={styles.sidebar__tabs__tab} isVisible={CurrentSidebarTab === 'schedule'} />

                <SidebarNewsTab className={styles.sidebar__tabs__tab} isVisible={CurrentSidebarTab === 'news'} />
            </div>
        </aside>
    );
};

export { SidebarContainer };
