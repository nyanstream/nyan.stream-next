import type { ReactComponent } from '@/types';

import styles from './Content.module.scss';

type PropsType = {
    IsSliderOpen: boolean;
    handleContentClick: () => void;
};

export const Content: ReactComponent<PropsType> = props => {
    const { IsSliderOpen } = props;
    const { handleContentClick } = props;
    const { children } = props;

    return (
        <div className={styles.content} data-is-slider-open={IsSliderOpen ? '' : null} onClick={IsSliderOpen ? handleContentClick : void 0}>
            {children}
        </div>
    );
};
