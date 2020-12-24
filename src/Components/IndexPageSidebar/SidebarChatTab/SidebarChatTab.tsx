import styles from './SidebarChatTab.module.scss';

type PropsType = {
    className: string;
    isVisible: boolean;
};

const SidebarChatTab: React.FC<PropsType> = ({ className, isVisible }) => {
    return (
        <section className={`${className} ${styles.sidebar__tabs__tab_chat}`} hidden={!isVisible}>
            <iframe src="https://thenyan.chatovod.ru" title="Чат" />
        </section>
    );
};

export default SidebarChatTab;
