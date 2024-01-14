import React from 'react';
import clsx from 'clsx';

import type { ReactComponent } from '@/types';

import { useNewYearSnow } from '@/hooks';

import styles from './NewYearSnow.module.scss';

export const NewYearSnow: ReactComponent = () => {
	const { IsNewYearSnowEnabled } = useNewYearSnow();

	return (
		<div className={styles.snow__container} hidden={!IsNewYearSnowEnabled}>
			{snowClassNames.map(className => (
				<React.Fragment key={className}>
					<div className={clsx(styles.snow, className)}></div>
					<div className={clsx(styles.snow, styles.snow_alt, className)}></div>
				</React.Fragment>
			))}
		</div>
	);
};

const snowClassNames = [styles.snow_near, styles.snow_mid, styles.snow_far];
