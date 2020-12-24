import styles from './SidebarNewsTab.module.scss';

type PropsType = {
    className: string;
    isVisible: boolean;
};

const SidebarNewsTab: React.FC<PropsType> = ({ className, isVisible }) => {
    return (
        <section className={`${className} ${styles.sidebar__tabs__tab_news}`} hidden={!isVisible}>
            news
        </section>
    );
};

export default SidebarNewsTab;
