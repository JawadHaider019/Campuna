/**
 * Utility for session-aware dynamic listing rotation.
 * Ensures fresh ads/listings are shown on every pick/refresh by prioritizing unseen items
 * from sessionStorage before looping back through seen items.
 * Guaranteed to NEVER repeat the same product in the same pick.
 *
 * @param {Array} listings - Full array of mapped listings from API
 * @param {number} targetCount - Maximum number of listings to select for display (default: 24)
 * @returns {Array} Rotated array of unique selected listings
 */
export function rotateListings(listings, targetCount = 10) {
    if (!Array.isArray(listings) || listings.length === 0) return [];

    // Deduplicate input array by item ID to guarantee no duplicates enter the pool
    const uniqueMap = new Map();
    listings.forEach(item => {
        if (!item) return;
        const itemId = item.id || item._id;
        if (itemId && !uniqueMap.has(String(itemId))) {
            uniqueMap.set(String(itemId), item);
        }
    });

    const uniqueListings = Array.from(uniqueMap.values());
    if (uniqueListings.length === 0) return [];

    const count = Math.min(targetCount || 10, uniqueListings.length);

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

    // Fisher-Yates shuffle unique listings first for maximum randomness
    const shuffled = [...uniqueListings];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Separate into unseen and seen items based on seenIds
    const seenSet = new Set(seenIds.map(String));
    const unseen = shuffled.filter(item => !seenSet.has(String(item.id || item._id)));
    const seen = shuffled.filter(item => seenSet.has(String(item.id || item._id)));

    let selected = [];

    if (unseen.length >= count) {
        // Plenty of unseen items available – select count from unseen
        selected = unseen.slice(0, count);
    } else {
        // Not enough unseen items – take all unseen, fill rest from seen
        selected = [...unseen];
        const remainingNeeded = count - selected.length;
        selected = selected.concat(seen.slice(0, remainingNeeded));
    }

    // Double-check strict uniqueness in selected pick
    const pickMap = new Map();
    const finalSelected = [];
    selected.forEach(item => {
        const itemId = String(item.id || item._id);
        if (!pickMap.has(itemId)) {
            pickMap.set(itemId, true);
            finalSelected.push(item);
        }
    });

    // Save current batch's IDs to sessionStorage with rolling window
    const newBatchIds = finalSelected.map(item => String(item.id || item._id));
    let updatedSeenIds = [...seenIds.filter(id => !newBatchIds.includes(id)), ...newBatchIds];

    // Cap history size so products eventually become unseen again after cycling
    const maxSeenHistory = Math.max(count, uniqueListings.length - count);
    if (updatedSeenIds.length > maxSeenHistory) {
        updatedSeenIds = updatedSeenIds.slice(updatedSeenIds.length - maxSeenHistory);
    }

    try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(updatedSeenIds));
    } catch (e) {
        console.warn('[Rotation] Failed to save seen IDs to sessionStorage:', e);
    }

    return finalSelected;
}

