/**
 * Dynamically determines the base URL of the parent window for navigation.
 * Supports both Bubble's test (/version-test) and live environments.
 * Falls back to 'https://campuna.de/version-test' if run standalone or on localhost.
 * 
 * @param {string} path - The relative path to append (e.g., 'listing_details/slug')
 * @returns {string} The full navigation URL
 */
export function getParentNavigationUrl(path) {
    const isIframe = window.self !== window.top;
    let base = 'https://campuna.de/version-test';

    if (isIframe && document.referrer) {
        try {
            const referrerUrl = new URL(document.referrer);
            // Ensure the referrer matches campuna.de domain (or localhost for development testing)
            if (
                referrerUrl.origin.includes('campuna.de') ||
                referrerUrl.origin.includes('localhost') ||
                referrerUrl.origin.includes('vercel.app')
            ) {
                base = referrerUrl.origin;
                if (referrerUrl.pathname.includes('/version-test')) {
                    base += '/version-test';
                }
            }
        } catch (e) {
            console.warn("Failed to parse document.referrer:", e);
        }
    }

    // Ensure clean slashes
    const cleanBase = base.replace(/\/+$/, '');
    const cleanPath = path.replace(/^\/+/, '');
    return `${cleanBase}/${cleanPath}`;
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
