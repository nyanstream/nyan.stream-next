import styles from './Content.module.scss';

type PropsType = {
    IsSliderOpen: boolean;
};

const Content: React.FC<PropsType> = props => {
    const { IsSliderOpen } = props;
    const { children } = props;

    return (
        <div className={styles.content} data-is-slider-open={IsSliderOpen ? '' : null}>
            {children}
        </div>
    );
};

export default Content;
