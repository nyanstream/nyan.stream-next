export const Title = 'NYAN.STREAM';

export const Description = 'Небольшое сообщество людей, которые иногда собираются вместе и смотрят различные мультимедиа';

export const PrimeColor = '#4d539c';

export const Host = 'https://nyan.stream';

export const ApiHost = 'https://nyan-api.blyat.science';

export const GoogleSiteVerification = 'CZKFsMeBuqFJ1KPYIaKptrBMmgolcM3bBbu6wt1Pf_g';

export const YandexVerification = 'eab231fe75b6da62';

export const ContentSecurityPolicy =
    `default-src 'self';` +
    `child-src 'self' https://chatovod.ru https://thenyan.chatovod.ru https://player.twitch.tv;` +
    `worker-src 'self' blob:;` +
    // `frame-ancestors 'self';` +
    `style-src 'self' 'unsafe-inline' data: https://cdn.blyat.science https://fonts.googleapis.com; ` +
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.blyat.science https://player.twitch.tv;` +
    `img-src 'self' data: https://cdn.blyat.science https://images.weserv.nl;` +
    `media-src 'self' blob:;` +
    `font-src 'self' data: https://fonts.gstatic.com;` +
    `connect-src 'self' https://nyan-api.blyat.science https://restreamer-app.blyat.science;`;
