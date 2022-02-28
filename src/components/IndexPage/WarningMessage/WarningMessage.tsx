import { useState } from 'react';

import styles from './WarningMessage.module.scss';

const WarningMessageWrapper: React.FC = ({ children }) => {
    const [IsWarningMessageVisible, setIsWarningMessageVisible] = useState(true);

    return IsWarningMessageVisible ? (
        <>
            <div className={styles.warningMessage}>
                <div>
                    <p>
                        Нажимая на кнопку <q>Согласен</q> Вы подтверждаете, что Вам есть 18 (или больше) лет, и Вы не имеете претензий к тому, какой
                        контент демонстрируется на данном сайте
                    </p>
                    <div>
                        <button onClick={() => setIsWarningMessageVisible(false)}>Согласен</button>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <>{children}</>
    );
};

export default WarningMessageWrapper;
