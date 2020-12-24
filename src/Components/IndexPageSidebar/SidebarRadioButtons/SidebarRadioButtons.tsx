import { SidebarTabType, SidebarTabItemDataType } from '../SidebarTypes';

import styles from './SidebarRadioButtons.module.scss';

type PropsType = {
    CurrentSidebarTab: SidebarTabType;
    handleSidebarRadioButtonClick: (tabName: SidebarTabType) => void;
};

const SidebarRadioButtons: React.FC<PropsType> = props => {
    const { CurrentSidebarTab } = props;
    const { handleSidebarRadioButtonClick } = props;

    const Tabs: SidebarTabItemDataType[] = [
        { key: 'chat', title: 'Чат' },
        { key: 'schedule', title: 'Расписание' },
        { key: 'news', title: 'Новости' },
    ];

    return (
        <ul className={styles.sidebar__radio}>
            {Tabs.map(TabData => (
                <li key={TabData.key}>
                    <button
                        role="radio"
                        data-active={TabData.key === CurrentSidebarTab ? '' : null}
                        onClick={() => handleSidebarRadioButtonClick(TabData.key)}>
                        {TabData.title}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default SidebarRadioButtons;
