// @ts-check

const package = require('./package.json');

/**
 * @type {import('next').NextConfig}
 **/

const NextConfig = {
    experimental: {
        fontLoaders: [{ loader: '@next/font/google', options: { subsets: ['latin', 'cyrillic'] } }],
    },
    images: {
        unoptimized: true,
    },
    sassOptions: {
        // TODO: primeColor из конфига
        additionalData: `
            $VERSION: ${encodeURIComponent(package.version)};
            $primeColor: #4d539c;
        `,
    },
};

module.exports = NextConfig;
