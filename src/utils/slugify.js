/**
 * Converts a listing title + Bubble _id into a URL-friendly slug.
 * Format: {title-slug}-{_id}
 * Example: "Anhänger mit Dachzelt | Minicamper" + "1782x123" → "anhänger-mit-dachzelt--minicamper-1782x123"
 */
export function slugifyListing(title, id) {
    const titleSlug = title
        .toLowerCase()
        .replace(/[^\w\säöüß-]/g, ' ') // keep word chars, German letters, spaces, hyphens
        .trim()
        .replace(/\s+/g, '-')           // spaces → hyphens
        .replace(/-{3,}/g, '--');       // collapse 3+ hyphens → 2
    return `${titleSlug}-${id}`;
}

/**
 * Extracts the Bubble _id from a listing slug.
 * The id is everything after the last '-' that matches the Bubble id pattern (digits + x + digits).
 */
export function extractIdFromSlug(slug) {
    // Bubble IDs look like: 1782630761652x264347898888847360
    const match = slug.match(/(\d+x\d+)$/);
    return match ? match[1] : null;
}
