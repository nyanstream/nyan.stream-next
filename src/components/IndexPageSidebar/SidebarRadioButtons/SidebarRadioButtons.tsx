import type { ReactComponent } from '@/utilities/types';

import { SidebarTabType, SidebarTabItemDataType } from '../SidebarTypes';

import styles from './SidebarRadioButtons.module.scss';

type PropsType = {
    CurrentSidebarTab: SidebarTabType;
    handleSidebarRadioButtonClick: (tabName: SidebarTabType) => void;
};

const SidebarRadioButtons: ReactComponent<PropsType> = props => {
    const { CurrentSidebarTab } = props;
    const { handleSidebarRadioButtonClick } = props;

    const Tabs: SidebarTabItemDataType[] = [
        { key: 'chat', title: 'Чат' },
        { key: 'schedule', title: 'Расписание' },
        { key: 'news', title: 'Новости' },
    ];

    return (
        <ul className={styles.sidebar__radio}>
            {Tabs.map(TabData => {
                const IsTabActive = TabData.key === CurrentSidebarTab;

                return (
                    <li key={TabData.key}>
                        <button
                            role="radio"
                            aria-checked={IsTabActive ? 'true' : 'false'}
                            data-active={IsTabActive ? '' : null}
                            onClick={() => handleSidebarRadioButtonClick(TabData.key)}>
                            {TabData.title}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default SidebarRadioButtons;
