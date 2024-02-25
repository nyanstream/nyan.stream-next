// @ts-check

import packageJson from './package.json' assert { type: 'json' };

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
	output: 'export',
	images: {
		unoptimized: true,
	},
	sassOptions: {
		// TODO: primeColor из конфига
		additionalData: `
            $VERSION: ${encodeURIComponent(packageJson.version)};
            $primeColor: #4d539c;
        `,
	},
};

export default nextConfig;
