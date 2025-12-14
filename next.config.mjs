// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
	output: 'standalone',
	images: {
		unoptimized: true,
	},
	sassOptions: {
		silenceDeprecations: ['legacy-js-api'],
		additionalData: '@use "src/styles/shared";',
	},
};

export default nextConfig;
