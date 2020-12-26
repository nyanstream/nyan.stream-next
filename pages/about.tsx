import { Link } from '../src/Components/common';

import TextPageContainer from '../src/Components/TextPage/TextPageContainer';
import TextPageSection from '../src/Components/TextPageSection/TextPageSection';

const AboutPage: React.FC = () => {
    return (
        <TextPageContainer pageName="О проекте">
            <TextPageSection id="about" title="О проекте">
                <p>
                    Мы – небольшое сообщество людей, которые иногда собираются вместе и смотрят различные мультимедиа (аниме, сериалы, фильмы, игры,
                    etc).
                </p>
                <p>
                    Никаких платных услуг или привилегий у нас нет и не планируется. Однако, вы можете поддерживать нашу мотивацию своими{' '}
                    <Link href="https://www.donationalerts.ru/r/thenyan">добровольными пожертвованиями</Link> (ведь сервер и лапшу быстрого
                    приготовления для стримеров нужно чем-то оплачивать).
                </p>
                <p>
                    Исходный код проекта доступен <Link href="https://github.com/nyanstream">на GitHub</Link>.
                </p>
            </TextPageSection>

            <TextPageSection id="contact" title="Связь">
                <p>
                    Связаться с нами можно посредством почты <Link href="mailto:nyan@cojam.ru">nyan@cojam.ru</Link> или с помощью{' '}
                    <Link href="https://vk.me/thenyan">личных сообщений</Link>
                    нашего сообщества ВК.
                </p>
            </TextPageSection>

            <TextPageSection id="chat-rules" title="Правила чата">
                <p>Мы стараемся создать атмосферу взаимопонимания и уюта, поэтому в нашем чате действует небольшой свод правил:</p>
                <ul>
                    <li>
                        администрация и модераторы не несут отвественности за контент, отправляемый участниками в чат, но оставляют за собой право в
                        любой момент удалять контент и приостанавливать доступ участников к общению без объяснения причин
                    </li>
                    <li>спам, детская порнография и шок-контент – под запретом</li>
                    <li>оскорбления, споры и угрозы допустимы, но в меру и только при условии, что собеседник не против</li>
                    <li>
                        пожертвование не даёт участнику никаких преимуществ перед другими и также не даёт ему права кого-либо оскорблять без причины
                        или что-либо требовать
                    </li>
                    <p>Участвуя в чате, вы безоговорочно принимаете указанные здесь условия.</p>
                </ul>
            </TextPageSection>

            {/* Текст взят с shikimori.org и copyright.sovetromantica.com */}
            <TextPageSection id="copyright" title="Право­облада­­телям">
                <p>
                    Если вы обнаружили на нашем сайте материал, который нарушает ваши авторские права, или же дискредитирует вашу компанию,
                    предоставляя неверную информацию, пожалуйста свяжитесь с нами для решения этого вопроса. Для этого необходимо отправить e-mail на
                    нашу почту <Link href="mailto:nyan@cojam.ru">nyan@cojam.ru</Link> с вашего корпоративного почтового ящика со следующим
                    содержанием:
                </p>
                <ul>
                    <li>контактные данные и реквизиты вашей компании</li>
                    <li>прямую ссылку/ссылки на материал, который вы считаете спорным</li>
                    <li>заверенные сканированные копии документов, подтверждающих ваше эксклюзивное право на материал</li>
                    <li>копии документов на посреднические услуги (в случае, если вы представляете интересы другой компании)</li>
                </ul>
                <p>
                    Вся информация будет проверена, и мы в кратчайшие сроки (насколько это будет возможно) свяжемся с вами для урегулирования спорного
                    вопроса.
                </p>
                <p>
                    Мы не продаем материалы на нашем сайте, весь контент предоставлен для бесплатного домашнего ознакомления. Мы уважаем мнение и
                    желания правообладателей и всегда идем к ним навстречу, готовы пойти как и на уступки, так и на сотрудничество.
                </p>
            </TextPageSection>
        </TextPageContainer>
    );
};

export default AboutPage;
