/**
 * Converts a listing title into a URL-safe slug.
 * e.g. "Anhänger mit Dachzelt Prime Tech" → "anhaenger-mit-dachzelt-prime-tech"
 */
export function slugify(text = '') {
    return text
        .toLowerCase()
        // Replace German umlauts and ß
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        // Strip accented chars (French, Spanish, etc.)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        // Replace non-alphanumeric chars with hyphens
        .replace(/[^a-z0-9]+/g, '-')
        // Trim leading/trailing hyphens
        .replace(/^-+|-+$/g, '');
}

/**
 * Builds the listing detail URL slug.
 * Pattern: /listing_details/[title-slug]--[id]
 * e.g. /listing_details/anhaenger-mit-dachzelt-prime-tech--1782630761652x264347898888847360
 */
export function buildListingSlug(title, id) {
    return `${slugify(title)}--${id}`;
}

/**
 * Parses a listing page slug back into its id part.
 * Splits on "--" and takes the last segment as the id.
 */
export function parseListingId(slug = '') {
    const parts = slug.split('--');
    return parts[parts.length - 1];
}
