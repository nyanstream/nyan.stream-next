import { useTheme } from '@/hooks';

import styles from './TextPageSection.module.scss';

type PropsType = {
    title: string;
    id: string;
};

const TextPageSection: React.FC<PropsType> = props => {
    const { title, id } = props;
    const { children } = props;

    const { Theme } = useTheme();

    return (
        <section className={styles.section} id={id} data-theme={Theme}>
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

export { TextPageSection };
