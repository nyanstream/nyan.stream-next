export const Title = 'NYAN.STREAM';

export const Description = 'Небольшое сообщество людей, которые иногда собираются вместе и смотрят различные мультимедиа';

export const PrimeColor = '#4d539c';

export const Host = 'https://nyan.stream';

export const ApiHost = 'https://nyan-api.blyat.science';

export const GoogleSiteVerification = 'CZKFsMeBuqFJ1KPYIaKptrBMmgolcM3bBbu6wt1Pf_g';

export const YandexVerification = 'eab231fe75b6da62';

const UnsafeScriptAddon = process.env.NODE_ENV === 'development' ? `'unsafe-eval'` : '';

export const ContentSecurityPolicy =
    `default-src 'self';` +
    `child-src 'self' https://chatovod.ru https://thenyan.chatovod.ru https://wasd.tv https://player.twitch.tv https://goodgame.ru;` +
    // `frame-ancestors 'self';` +
    `style-src 'self' 'unsafe-inline' data: https://cdn.blyat.science https://fonts.googleapis.com; ` +
    `script-src 'self' 'unsafe-inline' ${UnsafeScriptAddon} https://cdn.blyat.science;` +
    `img-src 'self' data: https://cdn.blyat.science https://images.weserv.nl;` +
    `media-src 'self' blob:;` +
    `font-src 'self' https://fonts.gstatic.com;` +
    `connect-src 'self' https://nyan-api.blyat.science;`;
