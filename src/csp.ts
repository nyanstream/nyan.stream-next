const ContentSecurityPolicy =
    `default-src 'self';` +
    `child-src 'self' https://chatovod.ru https://thenyan.chatovod.ru https://wasd.tv https://player.twitch.tv https://goodgame.ru;` +
    // `frame-ancestors 'self';` +
    `style-src 'self' 'unsafe-inline' data: https://cdn.blyat.science https://fonts.googleapis.com; ` +
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.blyat.science;` +
    `img-src 'self' data: https://cdn.blyat.science https://images.weserv.nl;` +
    `media-src 'self' blob:;` +
    `font-src 'self' https://fonts.gstatic.com;` +
    `connect-src 'self' https://nyan-api.blyat.science;`;

export default ContentSecurityPolicy;
