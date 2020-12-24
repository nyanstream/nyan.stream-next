import styles from './SidebarScheduleTab.module.scss';

type PropsType = {
    className: string;
    isVisible: boolean;
};

const SidebarScheduleTab: React.FC<PropsType> = ({ className, isVisible }) => {
    return (
        <section className={`${className} ${styles.sidebar__tabs__tab_schedule}`} hidden={!isVisible}>
            schedule
        </section>
    );
};

export default SidebarScheduleTab;
