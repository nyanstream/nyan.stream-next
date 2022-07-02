// @ts-check

const package = require('./package.json');

const withPlugins = require('next-compose-plugins');

/**
 * @type {import('next').NextConfig}
 **/

const NextConfig = {
    experimental: {
        images: {
            unoptimized: true,
        },
    },
    sassOptions: {
        // TODO: primeColor из конфига
        additionalData: `
            $VERSION: ${encodeURIComponent(package.version)};
            $primeColor: #4d539c;
        `,
    },
};

module.exports = withPlugins([], NextConfig);
