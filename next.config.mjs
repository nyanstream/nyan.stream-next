// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
	output: 'export',
	images: {
		unoptimized: true,
	},
	sassOptions: {
		silenceDeprecations: ['legacy-js-api'],
		additionalData: '@use "src/styles/shared";',
	},
};

export default nextConfig;
