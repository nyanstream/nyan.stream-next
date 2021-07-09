// @ts-check

const package = require('./package.json');

const withPlugins = require('next-compose-plugins');

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
const NextConfig = {
    sassOptions: {
        // TODO: primeColor из конфига
        additionalData: `
            $VERSION: ${encodeURIComponent(package.version)};
            $primeColor: #4d539c;
        `,
    },
};

module.exports = withPlugins([], NextConfig);
