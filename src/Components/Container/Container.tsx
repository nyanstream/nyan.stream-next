import { useState } from 'react';
import { useRouter } from 'next/router';

import CONFIG from '../../config';

import Head from 'next/head';

import Content from '../Content/Content';
import Slider from '../Slider/Slider';
import Header from '../Header/Component/Header';

import styles from './Container.module.scss';

type PropsType = {
    pageName?: string;
};

const Container: React.FC<PropsType> = props => {
    const { pageName } = props;
    const { children } = props;

    const { host: ProjectHost } = CONFIG;

    const Router = useRouter();

    const [IsSliderOpen, setIsSliderOpen] = useState<boolean>(false);

    const handleSliderTriggerButtonClick = () => {
        setIsSliderOpen(!IsSliderOpen);
    };

    const ProjectName = 'NYAN.STREAM';
    const ProjectDescription = 'Небольшое сообщество людей, которые иногда собираются вместе и смотрят различные мультимедиа';

    return (
        <>
            <Head>
                <title>NYAN.STREAM{pageName ? ` ${pageName}` : ''}</title>
                <meta name="description" content={ProjectDescription} key="description" />
                <meta property="og:locale" content="ru_RU" key="oglocale" />
                <meta property="og:type" content="website" key="ogwebsite" />
                <meta property="og:title" content={ProjectName} key="ogtitle" />
                <meta property="og:site_name" content={ProjectName} />
                <meta property="og:url" content={ProjectHost}></meta>
                <meta property="og:description" content={ProjectDescription} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            url: ProjectHost,
                            name: ProjectName,
                            description: ProjectDescription,
                        }),
                    }}
                />
                <link rel="canonical" href={`${ProjectHost}${Router.pathname}`} />
            </Head>
            <div className={styles.container}>
                <Slider {...{ IsSliderOpen }} />
                <Content {...{ IsSliderOpen }}>
                    <Header {...{ pageName }} {...{ handleSliderTriggerButtonClick }} />
                    {children}
                </Content>
            </div>
        </>
    );
};

export default Container;
