import type { ImageLoaderProps } from 'next/image';

export const getVkImageSizes = (imageSrc: string | undefined) => {
	if (!imageSrc) return [0, 0];

	const params = new URLSearchParams(new URL(imageSrc).search);
	const sizeParam = params.get('size');

	return sizeParam
		?.split('x')
		.map(Number)
		.map(value => value / 2);
};

export const weservImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
	const params = new URLSearchParams({
		w: String(width),
		q: String(quality || 75),
		url: src,
	});

	return `https://images.weserv.nl/?${params.toString()}`;
};
