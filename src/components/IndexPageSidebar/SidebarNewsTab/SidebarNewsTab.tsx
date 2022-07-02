import { useState } from 'react';
import Image from 'next/image';

import { getNews } from '@/api';
import type { NewsQueryResponseType } from '@/api/types';

import useAPI from '@/hooks/useAPI';

import type { ReactComponent } from '@/utilities/types';
import { getDateFormated } from '@/utilities/dates';

import { Link } from '@/components/common';

import { weservImageLoader, getVkImageSizes } from './utils/images';

import styles from './SidebarNewsTab.module.scss';

type PropsType = {
    className: string;
    isVisible: boolean;
};

const formatPostDate = (date: Date) => {
    return getDateFormated({ date, extraConfig: { hour: 'numeric', minute: 'numeric' } });
};

const SidebarNewsTab: ReactComponent<PropsType> = ({ className, isVisible }) => {
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
        <section className={`${className} ${styles.news}`} hidden={!isVisible}>
            <div className={styles.news__status}>
                {!IsResponseError && (!NewsData.com || !NewsData.posts) ? 'Загрузка...' : null}
                {NewsData.com && NewsData.posts && NewsData.posts.length === 0 ? 'Новостей нет' : ''}
                {IsResponseError ? 'API сайта недоступно' : null}
            </div>

            {NewsData.com && NewsData.posts && NewsData.posts.length !== 0 ? (
                <div className={styles.news__posts}>
                    {NewsData.posts.map(PostData => {
                        const postImageSize = getVkImageSizes(PostData.pic?.big);

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
                                    {PostData.pic ? (
                                        <Link href={PostData.pic.big} className={styles.news__posts__post__image}>
                                            <Image
                                                src={PostData.pic.big}
                                                loader={weservImageLoader}
                                                layout="intrinsic"
                                                width={postImageSize[0]}
                                                height={postImageSize[1]}
                                                alt="post image"
                                            />
                                        </Link>
                                    ) : null}
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

export default SidebarNewsTab;
