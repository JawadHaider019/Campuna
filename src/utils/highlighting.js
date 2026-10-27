/**
 * Campuna Smart Highlighting & Fair Rotation Engine
 */

import { isListingBoosted } from './sellerBadge';
import { isListingSold } from './formatters';

export function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function rotateListingsFairly(listings, storageKey = 'campuna_recent_carousel') {
    if (!listings || listings.length <= 1) return listings || [];

    if (typeof window !== 'undefined') {
        let rotationCounter = 0;
        try {
            const rawCounter = sessionStorage.getItem(`${storageKey}_idx`);
            if (rawCounter !== null && !isNaN(Number(rawCounter))) {
                rotationCounter = (parseInt(rawCounter, 10) + 1) % listings.length;
            } else {
                rotationCounter = Math.floor(Math.random() * listings.length);
            }
            sessionStorage.setItem(`${storageKey}_idx`, String(rotationCounter));
        } catch {
            rotationCounter = Math.floor(Math.random() * listings.length);
        }

        const offset = rotationCounter % listings.length;
        return [...listings.slice(offset), ...listings.slice(0, offset)];
    }

    return shuffleArray(listings);
}
