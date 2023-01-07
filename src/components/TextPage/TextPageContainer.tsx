import { useTheme } from '@/hooks';

import type { ReactComponent } from '@/types';

import { Container } from '@/components/Container';

import styles from './TextPage.module.scss';

type PropsType = {
    pageName: string;
};

const TextPageContainer: ReactComponent<PropsType> = ({ children, pageName }) => {
    const { Theme } = useTheme();

    return (
        <Container {...{ pageName }}>
            <main className={styles.textPage} data-theme={Theme}>
                {children}
            </main>
        </Container>
    );
};

export { TextPageContainer };
