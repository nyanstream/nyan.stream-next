import type { ReactComponent } from '@/types';

import styles from './SidebarChatTab.module.scss';

type PropsType = {
    className: string;
    isVisible: boolean;
};

const SidebarChatTab: ReactComponent<PropsType> = ({ className, isVisible }) => {
    return (
        <section className={`${className} ${styles.chat}`} hidden={!isVisible}>
            <iframe src="https://thenyan.chatovod.ru" title="Чат" />
        </section>
    );
};

export default SidebarChatTab;
