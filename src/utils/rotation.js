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
export function rotateListings(listings, targetCount = 15, preferredCategories = []) {
    if (!Array.isArray(listings) || listings.length === 0) return [];

    // Deduplicate input array by item ID to guarantee no duplicate IDs enter the pool
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

    const count = Math.min(targetCount || 15, uniqueListings.length);

    // Retrieve recently seen IDs from sessionStorage
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

    const seenSet = new Set(seenIds.map(String));

    // Helper to get image signature / title signature to prevent visually repetitive listings
    const getImageKey = (item) => {
        if (Array.isArray(item.images) && item.images.length > 0) return String(item.images[0]);
        if (typeof item.images === 'string') return item.images;
        return item['Main Image'] || item.MainImage || item.title || '';
    };

    const getTitleKey = (item) => {
        const title = item.title || item.description || '';
        return title.toLowerCase().replace(/[^a-z0-9äöüß\s]/gi, '').trim().split(/\s+/).slice(0, 3).join(' ');
    };

    const normalizedPreferred = Array.isArray(preferredCategories)
        ? preferredCategories.map(c => String(c).toLowerCase())
        : [];

    // Weighted random score generation
    const scoredListings = uniqueListings.map(item => {
        const itemId = String(item.id || item._id);
        const isRecentlySeen = seenSet.has(itemId);

        let categoryMultiplier = 1.0;
        if (normalizedPreferred.length > 0 && item.category) {
            const itemCat = String(item.category).toLowerCase();
            if (normalizedPreferred.includes(itemCat)) {
                categoryMultiplier = 2.5;
            }
        }

        // Unseen items get full random weight (0.0 to 1.0) * categoryMultiplier
        // Recently seen items get reduced weight (0.0 to 0.25) * categoryMultiplier
        const weight = (isRecentlySeen ? 0.25 : 1.0) * categoryMultiplier;
        const score = Math.random() * weight;
        return { item, score, itemId, imgKey: getImageKey(item), titleKey: getTitleKey(item) };
    });

    // Sort by weighted random score descending
    scoredListings.sort((a, b) => b.score - a.score);

    // Diversity selection: Ensure visually distinct listings in the 15-item batch
    const selected = [];
    const selectedImgCounts = new Map();
    const selectedTitleCounts = new Map();
    const remainingCandidates = [];

    // Pass 1: Select items with unique images and unique titles
    for (const candidate of scoredListings) {
        if (selected.length >= count) break;

        const imgCount = selectedImgCounts.get(candidate.imgKey) || 0;
        const titleCount = selectedTitleCounts.get(candidate.titleKey) || 0;

        if (imgCount === 0 && titleCount === 0) {
            selected.push(candidate.item);
            selectedImgCounts.set(candidate.imgKey, imgCount + 1);
            selectedTitleCounts.set(candidate.titleKey, titleCount + 1);
        } else {
            remainingCandidates.push(candidate);
        }
    }

    // Pass 2: If target count not reached, fill with items having soft duplicate caps (max 2 per image)
    if (selected.length < count) {
        for (const candidate of remainingCandidates) {
            if (selected.length >= count) break;

            const imgCount = selectedImgCounts.get(candidate.imgKey) || 0;
            if (imgCount < 2) {
                selected.push(candidate.item);
                selectedImgCounts.set(candidate.imgKey, imgCount + 1);
            }
        }
    }

    // Pass 3: Final fallback to fill target count if needed
    if (selected.length < count) {
        for (const candidate of remainingCandidates) {
            if (selected.length >= count) break;
            if (!selected.includes(candidate.item)) {
                selected.push(candidate.item);
            }
        }
    }

    // Save current batch's IDs to sessionStorage (rolling window of recent IDs)
    const finalSelected = selected;
    const newBatchIds = finalSelected.map(item => String(item.id || item._id));

    let updatedSeenIds = [...seenIds.filter(id => !newBatchIds.includes(id)), ...newBatchIds];
    const maxSeenHistory = Math.min(uniqueListings.length - 1, count * 2);
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



