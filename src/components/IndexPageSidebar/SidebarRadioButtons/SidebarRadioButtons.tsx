import type { ReactComponent } from '@/types';

import { SidebarTabKey, SidebarTabItem } from '../SidebarTypes';

import styles from './SidebarRadioButtons.module.scss';

type PropsType = {
	CurrentSidebarTab: SidebarTabKey;
	handleSidebarRadioButtonClick: (tabKey: SidebarTabKey) => void;
};

export const SidebarRadioButtons: ReactComponent<PropsType> = props => {
	const { CurrentSidebarTab } = props;
	const { handleSidebarRadioButtonClick } = props;

	return (
		<ul className={styles.sidebar__radio}>
			{tabs.map(tab => {
				const IsTabActive = tab.key === CurrentSidebarTab;

				return (
					<li key={tab.key}>
						<button
							role="radio"
							aria-checked={IsTabActive ? 'true' : 'false'}
							data-active={IsTabActive ? '' : null}
							onClick={() => handleSidebarRadioButtonClick(tab.key)}>
							{tab.title}
						</button>
					</li>
				);
			})}
		</ul>
	);
};

const tabs: SidebarTabItem[] = [
	{ key: 'chat', title: 'Чат' },
	{ key: 'schedule', title: 'Расписание' },
	{ key: 'news', title: 'Новости' },
];
