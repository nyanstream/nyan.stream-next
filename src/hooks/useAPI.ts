import { useEffect } from 'react';

const useAPI = (queryFunction: () => void, timeInterval: number) =>
    useEffect(() => {
        queryFunction();

        const Timer = setInterval(() => {
            queryFunction();
        }, timeInterval * 1000);

        return () => {
            clearInterval(Timer);
        };
    }, []);

export default useAPI;
