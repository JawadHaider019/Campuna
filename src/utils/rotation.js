/**
 * Utility for session-aware dynamic listing rotation.
 * Ensures fresh ads/listings are shown on every page load/refresh by prioritizing unseen items
 * from sessionStorage before looping back through seen items.
 *
 * @param {Array} listings - Full array of mapped listings from API
 * @param {number} targetCount - Number of listings to select for display (default: 24)
 * @returns {Array} Rotated array of selected listings
 */
export function rotateListings(listings, targetCount = listings?.length || 50) {
    if (!Array.isArray(listings) || listings.length === 0) return [];
    if (listings.length <= targetCount) {
        // Simple Fisher-Yates shuffle if total count is small
        const copy = [...listings];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    // Retrieve seen IDs from sessionStorage
    const SESSION_KEY = 'campuna_seen_ad_ids';
    let seenIds = [];
    try {
        const stored = sessionStorage.getItem(SESSION_KEY);
        if (stored) {
            seenIds = JSON.parse(stored);
        }
    } catch (e) {
        console.warn('[Rotation] sessionStorage unavailable:', e);
    }

    // Fisher-Yates shuffle full listings first for randomness
    const shuffled = [...listings];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Separate into unseen and seen items
    const seenSet = new Set(seenIds);
    const unseen = shuffled.filter(item => item && item.id && !seenSet.has(String(item.id)));
    const seen = shuffled.filter(item => item && item.id && seenSet.has(String(item.id)));

    let selected = [];
    let updatedSeenIds = [...seenIds];

    if (unseen.length >= targetCount) {
        // Plenty of unseen items available – select targetCount from unseen
        selected = unseen.slice(0, targetCount);
        selected.forEach(item => updatedSeenIds.push(String(item.id)));
    } else {
        // Not enough unseen items – take all unseen, fill rest from seen, then reset session tracker
        selected = [...unseen];
        const remainingNeeded = targetCount - selected.length;
        selected = selected.concat(seen.slice(0, remainingNeeded));
        // Reset seen IDs to just the currently selected batch for next cycles
        updatedSeenIds = selected.map(item => String(item.id));
    }

    // Save updated seen IDs to sessionStorage
    try {
        // Keep array size reasonable (max 200 IDs)
        if (updatedSeenIds.length > 200) {
            updatedSeenIds = updatedSeenIds.slice(-200);
        }
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(updatedSeenIds));
    } catch (e) {
        console.warn('[Rotation] Failed to save seen IDs to sessionStorage:', e);
    }

    return selected;
}
