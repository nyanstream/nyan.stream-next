import { useState } from 'react';

import Content from '../Content/Content';
import Slider from '../Slider/Slider';
import Header from '../Header/Component/Header';

import styles from './Container.module.scss';

const Container: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [IsSliderOpen, setIsSliderOpen] = useState<boolean>(false);

    const handleSliderTriggerButtonClick = () => {
        setIsSliderOpen(!IsSliderOpen);
    };

    return (
        <>
            <div className={styles.container}>
                <Slider {...{ IsSliderOpen }} />
                <Content {...{ IsSliderOpen }}>
                    <Header {...{ handleSliderTriggerButtonClick }} />
                    {children}
                </Content>
            </div>
        </>
    );
};

export default Container;
