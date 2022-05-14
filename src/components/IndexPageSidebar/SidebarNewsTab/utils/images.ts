import type { ImageLoaderProps } from 'next/image';

export const getVkImageSizes = (imageSrc: string | undefined) => {
    if (!imageSrc) return [0, 0];

    const params = new URLSearchParams(new URL(imageSrc).search);
    const sizeParam = params.get('size');

    return (
        (sizeParam
            ?.split('x')
            .map(Number)
            .map(value => value / 2) as [width: number, height: number]) || null
    );
};

export const weservImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    const params = new URLSearchParams({
        w: width,
        q: quality || 75,
        url: src,
    } as any);

    return `https://images.weserv.nl/?${params.toString()}`;
};
