import type { ReactComponent } from '@/types';

import { useTheme } from '@/hooks';

import { SidebarChatTab } from './SidebarChatTab/SidebarChatTab';

import styles from './Sidebar.module.scss';

type PropsType = {
	IsSidebarHidden: boolean;
};

export const SidebarContainer: ReactComponent<PropsType> = props => {
	const { IsSidebarHidden } = props;

	const { Theme } = useTheme();

	return (
		<aside className={styles.sidebar} data-theme={Theme} hidden={IsSidebarHidden}>
			<div className={styles.sidebar__tabs}>
				<SidebarChatTab className={styles.sidebar__tabs__tab} isVisible={true} />
			</div>
		</aside>
	);
};
