import { useContext } from 'react';

import { NewYearSnowContext } from '@/providers';

export const useNewYearSnow = () => {
	return useContext(NewYearSnowContext);
};
