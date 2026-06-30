const BASE_URL = 'https://campuna.de';

/**
 * Builds a full navigation URL using the fixed base.
 * 
 * @param {string} path - The relative path to append (e.g., 'listing_details/slug')
 * @returns {string} The full navigation URL
 */
export function getParentNavigationUrl(path) {
    const cleanPath = path.replace(/^\/+/, '').replace(/\/+$/, '');
    return cleanPath ? `${BASE_URL}/${cleanPath}` : BASE_URL;
}

/**
 * Navigates the parent window to the specified relative path if running in an iframe.
 * If running standalone, navigates the current window.
 * 
 * @param {string} path - The relative path (e.g., 'listing_details/slug')
 */
export function navigateTo(path) {
    const targetUrl = getParentNavigationUrl(path);
    if (window.self !== window.top) {
        // Inside iframe - navigate parent window
        window.open(targetUrl, '_parent');
    } else {
        // Standalone - navigate current window
        window.location.href = targetUrl;
    }
}
