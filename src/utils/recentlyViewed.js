const STORAGE_KEY = 'campuna_recently_viewed_history';

/**
 * Checks if the user has given consent for functional preferences / storage.
 * In Cookiebot CMP, functionality or preferences consent enables personalization storage.
 * If Cookiebot is not active (e.g. during local dev or before banner load), returns true safely for standard local storage.
 */
function isStoragePermitted() {
    if (typeof window === 'undefined') return false;
    if (window.Cookiebot && window.Cookiebot.consent) {
        // If Cookiebot is present, respect preference / functionality consent
        return Boolean(window.Cookiebot.consent.preferences || window.Cookiebot.consent.necessary);
    }
    return true;
}

export function getRecentlyViewedIds() {
    if (!isStoragePermitted()) return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function addRecentlyViewedId(listingId) {
    if (!listingId || !isStoragePermitted()) return;
    try {
        const current = getRecentlyViewedIds();
        const filtered = current.filter(id => String(id) !== String(listingId));
        const updated = [String(listingId), ...filtered].slice(0, 15);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('campuna-history-updated', { detail: { id: listingId } }));
        }
    } catch {
        // LocalStorage blocked
    }
}
