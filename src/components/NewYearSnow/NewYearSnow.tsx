import { Fragment } from 'react';

import type { ReactComponent } from '@/utilities/types';

import styles from './NewYearSnow.module.scss';

type PropsType = {
    enabled: boolean;
};

const NewYearSnow: ReactComponent<PropsType> = ({ enabled }) => {
    return (
        <div className={styles.snow__container} hidden={!enabled}>
            {[styles.snow_near, styles.snow_mid, styles.snow_far].map(className => (
                <Fragment key={className}>
                    <div className={`${styles.snow} ${className}`}></div>
                    <div className={`${styles.snow} ${styles.snow_alt} ${className}`}></div>
                </Fragment>
            ))}
        </div>
    );
};

export default NewYearSnow;
