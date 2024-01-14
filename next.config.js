// @ts-check

const package = require('./package.json');

/**
 * @type {import('next').NextConfig}
 **/

const NextConfig = {
	output: 'export',
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
