
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

export function buildListingSlug(title, id) {
    return `${slugify(title)}-${id}`;
}

export function parseListingId(slug = '') {
    const parts = slug.split('-');
    return parts[parts.length - 1];
}