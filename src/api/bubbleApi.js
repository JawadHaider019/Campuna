import axios from "axios";

// Fetch all active listings for rotation (default limit: 150)
const HOMEPAGE_LISTING_LIMIT = 150;

const API_URL =
    "https://simoneasalvo.bubbleapps.io/api/1.1/wf/homepage-products";

let inMemoryCache = null;
let inMemoryCacheTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export const getHomepageProducts = async (limit = HOMEPAGE_LISTING_LIMIT) => {
    const now = Date.now();
    const cacheKey = `campuna_homepage_products_${limit}`;

    // 1. Check in-memory cache first
    if (inMemoryCache && inMemoryCacheKey === cacheKey && (now - inMemoryCacheTime < CACHE_TTL_MS)) {
        return inMemoryCache;
    }

    // 2. Check sessionStorage
    try {
        const stored = sessionStorage.getItem(cacheKey);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed && parsed.timestamp && (now - parsed.timestamp < CACHE_TTL_MS)) {
                inMemoryCache = parsed.data;
                inMemoryCacheTime = parsed.timestamp;
                inMemoryCacheKey = cacheKey;
                return parsed.data;
            }
        }
    } catch (e) {
        // sessionStorage might be restricted or throw in private mode
    }

    try {
        const response = await axios.post(API_URL, { limit });
        if (response.data) {
            inMemoryCache = response.data;
            inMemoryCacheTime = now;
            inMemoryCacheKey = cacheKey;
            try {
                sessionStorage.setItem(cacheKey, JSON.stringify({ timestamp: now, data: response.data }));
            } catch (e) {
                // Ignore storage quota errors
            }
        }
        return response.data;
    } catch (error) {
        // If API fails but we have stale cache, return stale cache as fallback
        if (inMemoryCache) {
            return inMemoryCache;
        }
        console.error("Bubble API Error:", error);
        throw error;
    }
};

let inMemoryCacheKey = '';

export const getCategoryProducts = async (categoryName) => {
    try {
        const response = await axios.post(API_URL, { category: categoryName });
        return response.data;
    } catch (error) {
        console.error("Bubble API Category Error:", error);
        throw error;
    }
};