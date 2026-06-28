import axios from "axios";

const BASE = "https://simoneasalvo.bubbleapps.io/version-test/api/1.1";

export const getHomepageProducts = async () => {
    try {
        const response = await axios.post(`${BASE}/wf/homepage-products`, {});
        return response.data;
    } catch (error) {
        console.error("Bubble API Error:", error);
        throw error;
    }
};

/**
 * Fetch a single listing by its Bubble _id.
 * Uses the Bubble Data API endpoint for the "listing" data type.
 */
export const getListingById = async (id) => {
    try {
        const response = await axios.get(`${BASE}/obj/listing/${id}`);
        return response.data?.response || null;
    } catch (error) {
        console.error("Bubble API Error (getListingById):", error);
        throw error;
    }
};