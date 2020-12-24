import { useState } from 'react';

import { getNews } from '../../../../../api';
import type { NewsQueryResponseType } from '../../../../../api/types';

import useAPI from '../../../../../hooks/useAPI';

import { getDateFormated } from '../../../../../utilities/dates';

import styles from './SidebarNewsTab.module.scss';

type PropsType = {
    className: string;
    isVisible: boolean;
};

const SidebarNewsTab: React.FC<PropsType> = ({ className, isVisible }) => {
    const [NewsData, setNewsData] = useState<Partial<NewsQueryResponseType>>({});
    const [IsResponseError, setIsResponseError] = useState<boolean>(false);

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
        <section className={`${className} ${styles.news}`} hidden={!isVisible}>
            <div className={styles.news__status}>
                {!IsResponseError && (!NewsData.com || !NewsData.posts) ? 'Загрузка...' : null}
                {NewsData.com && NewsData.posts && NewsData.posts.length === 0 ? 'Новостей нет' : ''}
                {IsResponseError ? 'API сайта недоступно' : null}
            </div>
            {NewsData.com && NewsData.posts && NewsData.posts.length !== 0 ? (
                <div className={styles.news__posts}>
                    {NewsData.posts.map(PostData => (
                        <div key={PostData.id} className={styles.news__posts__post}>
                            <div className={styles.news__posts__post__meta}>
                                <a href={`https://vk.com/wall-${NewsData.com?.id}_${PostData.id}`} target="_blank" rel="nofollow noopener">
                                    {getDateFormated({ date: new Date(PostData.time * 1000), extraConfig: { hour: 'numeric', minute: 'numeric' } })}
                                </a>
                                {PostData.type === 'copy' ? (
                                    <>
                                        {' '}
                                        <span title="Репост">⤵</span>
                                    </>
                                ) : null}
                            </div>

                            <div className={styles.news__posts__post__body}>
                                {PostData.pic ? (
                                    <a href={PostData.pic.big} className={styles.news__posts__post__image} target="_blank" rel="nofollow noopener">
                                        <img src={PostData.pic.small} alt="post image" />
                                    </a>
                                ) : null}
                                <p>{PostData.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </section>
    );
};

export default SidebarNewsTab;
