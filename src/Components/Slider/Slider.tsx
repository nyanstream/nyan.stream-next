import SliderHeader from './SliderHeader';

import styles from './Slider.module.scss';

type PropsType = {
    IsSliderOpen: boolean;
};

const Slider: React.FC<PropsType> = ({ IsSliderOpen }) => (
    <div className={styles.slider} data-is-slider-open={IsSliderOpen ? '' : null}>
        <SliderHeader />
        <div className="slider__content"></div>
    </div>
);

export default Slider;
