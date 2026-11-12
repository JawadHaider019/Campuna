const STORAGE_KEY = 'campuna_recently_viewed_history';

export function getRecentlyViewedIds() {
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
    if (!listingId) return;
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

