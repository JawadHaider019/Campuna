import axios from 'axios';

const API_URL = "https://simoneasalvo.bubbleapps.io/api/1.1/wf/homepage-products";

async function main() {
    try {
        const response = await axios.post(API_URL, { limit: 100 });
        const listings = response.data.response.listing;
        const categories = [...new Set(listings.map(l => l.Category))];
        console.log("Categories found in API listings:", categories);

        console.log("\nSome listings:");
        listings.forEach(l => {
            if (l.Category && (l.Category.toLowerCase().includes('boat') || l.Category.toLowerCase().includes('boot') || l.Category.toLowerCase().includes('wasser'))) {
                console.log(`Title: ${l.title}, Category: ${l.Category}`);
            }
        });
    } catch (e) {
        console.error(e);
    }
}

main();
