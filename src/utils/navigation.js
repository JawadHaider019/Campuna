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

    // Check if the current page url or query string implies version-test
    const currentUrl = window.location.href;
    let urlParams = new URLSearchParams(window.location.search);
    const hasVersionTestQuery = urlParams.has('version-test') ||
        urlParams.get('env') === 'test' ||
        urlParams.get('version') === 'version-test' ||
        urlParams.get('parent_url')?.includes('version-test');

    let isTestEnv = hasVersionTestQuery || currentUrl.includes('version-test');
    let origin = 'https://campuna.de';

    if (isIframe && document.referrer) {
        try {
            const referrerUrl = new URL(document.referrer);
            if (
                referrerUrl.origin.includes('campuna.de') ||
                referrerUrl.origin.includes('localhost') ||
                referrerUrl.origin.includes('vercel.app')
            ) {
                origin = referrerUrl.origin;
                // If referrer explicitly contains version-test, use test env
                if (referrerUrl.pathname.includes('/version-test')) {
                    isTestEnv = true;
                } else if (!hasVersionTestQuery && !currentUrl.includes('version-test')) {
                    // Otherwise, only set to false if no query overrides say it is test mode
                    isTestEnv = false;
                }
            }
        } catch (e) {
            console.warn("Failed to parse document.referrer:", e);
        }
    } else if (!isIframe) {
        // Default to test environment for local development/Vercel preview standalones
        const hostname = window.location.hostname;
        if (hostname.includes('localhost') || hostname.includes('127.0.0.1') || hostname.includes('vercel.app')) {
            isTestEnv = true;
        }
    }

    const cleanOrigin = origin.replace(/\/+$/, '');
    const cleanPath = path.replace(/^\/+/, '').replace(/\/+$/, '');

    if (isTestEnv) {
        // Bubble structures dynamic page URLs in test mode with version-test after page name
        if (cleanPath.startsWith('listing_details/')) {
            const slug = cleanPath.substring('listing_details/'.length);
            return `${cleanOrigin}/listing_details/version-test/${slug}`;
        } else if (cleanPath.startsWith('category/')) {
            const slug = cleanPath.substring('category/'.length);
            return `${cleanOrigin}/category/version-test/${slug}`;
        } else {
            // General static pages structure
            return cleanPath ? `${cleanOrigin}/version-test/${cleanPath}` : `${cleanOrigin}/version-test`;
        }
    } else {
        // Production environment links
        return cleanPath ? `${cleanOrigin}/${cleanPath}` : cleanOrigin;
    }
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
