import styles from './Settings.module.scss';

type PropsType = {
    IsSettingsOpen: boolean;
};

const SettingsContainer: React.FC<PropsType> = props => {
    const { IsSettingsOpen } = props;

    return (
        <dialog className={styles.options} open={IsSettingsOpen}>
            <h3>Настройки</h3>
            <form method="dialog">
                <menu>
                    <button type="reset">Закрыть</button>
                    <button type="submit">Сохранить</button>
                </menu>
            </form>
        </dialog>
    );
};

export default SettingsContainer;
