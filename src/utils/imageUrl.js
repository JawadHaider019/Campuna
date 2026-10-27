/**
 * Image URL resolver helper
 */
export const getImageUrl = (url, fallback = null) => {
    if (!url) return fallback;

    if (Array.isArray(url)) {
        return url.length > 0 ? getImageUrl(url[0], fallback) : fallback;
    }

    if (typeof url === 'object' && url !== null) {
        return url.url || url.src || fallback;
    }

    if (typeof url !== 'string') return fallback;
    let trimmed = url.trim();
    if (!trimmed) return fallback;

    if (trimmed.startsWith('//')) {
        trimmed = `https:${trimmed}`;
    }

    return trimmed;
};

export const getFirstValidImage = (images, fallback = null) => {
    if (!images) return fallback;
    if (typeof images === 'string') return getImageUrl(images, fallback);
    if (Array.isArray(images) && images.length > 0) {
        return getImageUrl(images[0], fallback);
    }
    return fallback;
};

export default getImageUrl;
