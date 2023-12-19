import type { ReactComponent } from '@/types';
import clsx from 'clsx';

import styles from './SidebarChatTab.module.scss';

type PropsType = {
    className: string;
    isVisible: boolean;
};

export const SidebarChatTab: ReactComponent<PropsType> = ({ className, isVisible }) => {
    return (
        <section className={clsx(className, styles.chat)} hidden={!isVisible}>
            <iframe src="https://thenyan.chatovod.ru" title="Чат" />
        </section>
    );
};
