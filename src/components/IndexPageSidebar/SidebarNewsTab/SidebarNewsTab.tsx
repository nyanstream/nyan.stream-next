import { useState } from 'react';
import clsx from 'clsx';

import { getNews } from '@/api';
import type { NewsQueryResponseType } from '@/api/types';

import useAPI from '@/hooks/useAPI';

import type { ReactComponent } from '@/types';
import { getDateFormated } from '@/utilities/dates';

import { Link } from '@/components/common';

import styles from './SidebarNewsTab.module.scss';

type PropsType = {
    className: string;
    isVisible: boolean;
};

export const SidebarNewsTab: ReactComponent<PropsType> = ({ className, isVisible }) => {
    const [NewsData, setNewsData] = useState<Partial<NewsQueryResponseType>>({});
    const [IsResponseError, setIsResponseError] = useState(false);

    const newsQuery = () => {
        getNews()
            .then(data => {
                setNewsData(data);
                if (IsResponseError) {
                    setIsResponseError(false);
                }
            })
            .catch(() => {
                setIsResponseError(true);
            });
    };

    useAPI(newsQuery, 10);

    return (
        <section className={clsx(className, styles.news)} hidden={!isVisible}>
            <div className={styles.news__status}>
                {!IsResponseError && (!NewsData.com || !NewsData.posts) ? 'Загрузка...' : null}
                {NewsData.com && NewsData.posts && NewsData.posts.length === 0 ? 'Новостей нет' : ''}
                {IsResponseError ? 'API сайта недоступно' : null}
            </div>

            {NewsData.com && NewsData.posts && NewsData.posts.length !== 0 ? (
                <div className={styles.news__posts}>
                    {NewsData.posts.map(PostData => {
                        return (
                            <div key={PostData.id} className={styles.news__posts__post}>
                                <div className={styles.news__posts__post__meta}>
                                    <Link href={`https://vk.com/wall-${NewsData.com?.id}_${PostData.id}`}>
                                        {formatPostDate(new Date(PostData.time * 1000))}
                                    </Link>
                                    {PostData.type === 'copy' ? (
                                        <>
                                            {' '}
                                            <span title="Репост">⤵</span>
                                        </>
                                    ) : null}
                                </div>

                                <div className={styles.news__posts__post__body}>
                                    <p>{PostData.text}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : null}
        </section>
    );
};

const formatPostDate = (date: Date) => {
    return getDateFormated({ date, extraConfig: { hour: 'numeric', minute: 'numeric' } });
};
