// @ts-check

const package = require('./package.json');

const withPlugins = require('next-compose-plugins');

/**
 * @type {import('next').NextConfig}
 **/
const NextConfig = {
    sassOptions: {
        // TODO: primeColor из конфига
        additionalData: `
            $VERSION: ${encodeURIComponent(package.version)};
            $primeColor: #ad2929;
        `,
    },
};

module.exports = withPlugins([], NextConfig);
