import axios from "axios";

const API_URL =
    "https://simoneasalvo.bubbleapps.io/version-test/api/1.1/wf/homepage-products";

export const getHomepageProducts = async () => {
    try {
        const response = await axios.post(API_URL, {});

        return response.data;
    } catch (error) {
        console.error("Bubble API Error:", error);
        throw error;
    }
};