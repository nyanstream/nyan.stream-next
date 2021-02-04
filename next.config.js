const package = require('./package.json');

const withPlugins = require('next-compose-plugins');

const withImages = require('next-images');

module.exports = withPlugins([withImages({ esModule: false, inlineImageLimit: false })], {
    sassOptions: {
        // TODO: primeColor из конфига
        additionalData: `
            $VERSION: ${encodeURIComponent(package.version)};
            $primeColor: #4d539c;
        `,
    },
});
