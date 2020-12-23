import ImageLogo from '../../../static/images/logo.svg';

import styles from './Header.module.scss';

const HeaderBrandMain: React.FC = () => {
    return (
        <>
            <div className={styles.header__brand__logo}>
                <img src={ImageLogo} alt="Логотип" data-lang-image="logo" />
            </div>
            <h1 className={styles.header__brand__text}>NYAN.STREAM</h1>
        </>
    );
};

export default HeaderBrandMain;
