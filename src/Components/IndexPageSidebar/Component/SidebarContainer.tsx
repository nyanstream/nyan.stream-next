import { useState } from 'react';

import { SidebarTabType } from '../SidebarTypes';

import SidebarRadioButtons from '../SidebarRadioButtons/SidebarRadioButtons';
import SidebarChatTab from '../SidebarChatTab/SidebarChatTab';
import SidebarScheduleTab from '../SidebarScheduleTab/SidebarScheduleTab';
import SidebarNewsTab from '../SidebarNewsTab/SidebarNewsTab';

import styles from './Sidebar.module.scss';

type PropsType = {
    IsSidebarHidden: boolean;
};

const SidebarContainer: React.FC<PropsType> = props => {
    const { IsSidebarHidden } = props;

    const [CurrentSidebarTab, setCurrentSidebarTab] = useState<SidebarTabType>('chat');

    const handleSidebarRadioButtonClick = (tabName: SidebarTabType) => {
        setCurrentSidebarTab(tabName);
    };

    return (
        <aside className={styles.sidebar} hidden={IsSidebarHidden}>
            <SidebarRadioButtons {...{ CurrentSidebarTab }} {...{ handleSidebarRadioButtonClick }} />
            <div className={styles.sidebar__tabs}>
                <SidebarChatTab className={styles.sidebar__tabs__tab} isVisible={CurrentSidebarTab === 'chat'} />
                <SidebarScheduleTab className={styles.sidebar__tabs__tab} isVisible={CurrentSidebarTab === 'schedule'} />
                <SidebarNewsTab className={styles.sidebar__tabs__tab} isVisible={CurrentSidebarTab === 'news'} />
            </div>
        </aside>
    );
};

export default SidebarContainer;
