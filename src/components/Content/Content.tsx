import styles from './Content.module.scss';

type PropsType = {
    IsSliderOpen: boolean;
    handleContentClick: () => void;
};

const Content: React.FC<PropsType> = props => {
    const { IsSliderOpen } = props;
    const { handleContentClick } = props;
    const { children } = props;

    return (
        <div className={styles.content} data-is-slider-open={IsSliderOpen ? '' : null} onClick={IsSliderOpen ? handleContentClick : void 0}>
            {children}
        </div>
    );
};

export default Content;
