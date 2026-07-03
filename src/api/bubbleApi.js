import axios from "axios";

// FeaturedListings shows max 12 items per row × 2 rows = 24 items
const HOMEPAGE_LISTING_LIMIT = 24;

const API_URL =
    "https://simoneasalvo.bubbleapps.io/api/1.1/wf/homepage-products";

export const getHomepageProducts = async () => {
    try {
        const response = await axios.post(API_URL, { limit: HOMEPAGE_LISTING_LIMIT });

        return response.data;
    } catch (error) {
        console.error("Bubble API Error:", error);
        throw error;
    }
};

export const getCategoryProducts = async (categoryName) => {
    try {
        const response = await axios.post(API_URL, { category: categoryName });
        return response.data;
    } catch (error) {
        console.error("Bubble API Category Error:", error);
        throw error;
    }
};