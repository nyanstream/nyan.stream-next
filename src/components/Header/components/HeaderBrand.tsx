import Link from 'next/link';

import type { ReactComponent } from '@/types';

import { HeaderBrandMain } from './HeaderBrandMain';

import styles from './HeaderBrand.module.scss';

type PropsType = {
    pageName?: string;
};

export const HeaderBrand: ReactComponent<PropsType> = ({ pageName }) => {
    return (
        <div className={styles.header__brand} data-with-pagename={pageName ? '' : null}>
            <div>
                {pageName ? (
                    <Link href="/" passHref>
                        <HeaderBrandMain />
                    </Link>
                ) : (
                    <HeaderBrandMain />
                )}
            </div>

            {pageName ? (
                <div className={styles.header__brand__item}>
                    <span className={styles.header__brand__text} data-style="no-hover">
                        &nbsp;/&nbsp;
                    </span>
                    <span className={styles.header__brand__text}>{pageName}</span>
                </div>
            ) : null}
        </div>
    );
};
