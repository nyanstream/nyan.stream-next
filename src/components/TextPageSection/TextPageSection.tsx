import styles from './TextPageSection.module.scss';

type PropsType = {
    title: string;
    id: string;
};

const TextPageContainer: React.FC<PropsType> = props => {
    const { title, id } = props;
    const { children } = props;

    return (
        <section className={styles.section} id={id}>
            <h2 className={styles.section__heading}>
                <span>{title}</span>

                <a href={`#${id}`} aria-hidden="true">
                    #
                </a>
            </h2>
            {children}
        </section>
    );
};

export default TextPageContainer;
