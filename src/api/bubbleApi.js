import axios from "axios";

// Fetch all active listings for rotation (default limit: 150)
const HOMEPAGE_LISTING_LIMIT = 150;

const API_URL =
    "https://simoneasalvo.bubbleapps.io/api/1.1/wf/homepage-products";

export const getHomepageProducts = async (limit = HOMEPAGE_LISTING_LIMIT) => {
    try {
        const response = await axios.post(API_URL, { limit });

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