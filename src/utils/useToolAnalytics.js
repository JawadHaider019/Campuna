import { useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for tracking tool page views and usage events.
 *
 * Fires events via:
 * 1. window.parent.postMessage() → Bubble parent can listen and track
 * 2. gtag() → Google Analytics (if available on the page or parent)
 *
 * @param {string} toolName - Identifier for the tool (e.g. 'zuladungsrechner', 'reisekostenrechner')
 * @returns {{ trackUsage: (action: string, data?: object) => void }}
 */
export function useToolAnalytics(toolName) {
    const hasFiredPageView = useRef(false);

    // Determine the correct parent origin for postMessage
    const getTargetOrigin = () => {
        if (import.meta.env.DEV) return '*';
        return 'https://campuna.de';
    };

    // Fire page view on mount (once)
    useEffect(() => {
        if (hasFiredPageView.current) return;
        hasFiredPageView.current = true;

        const event = {
            type: 'TOOL_PAGE_VIEW',
            tool: toolName,
            timestamp: new Date().toISOString(),
            url: window.location.pathname
        };

        // PostMessage to Bubble parent
        try {
            if (window.self !== window.top) {
                window.parent.postMessage(event, getTargetOrigin());
            }
        } catch (e) {
            console.debug('[ToolAnalytics] postMessage failed:', e);
        }

        // Google Analytics (gtag)
        try {
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'tool_page_view', {
                    tool_name: toolName,
                    page_path: window.location.pathname
                });
            }
        } catch (e) {
            console.debug('[ToolAnalytics] gtag failed:', e);
        }

        console.debug(`[ToolAnalytics] Page view tracked: ${toolName}`);
    }, [toolName]);

    /**
     * Track a specific usage interaction with the tool.
     *
     * @param {string} action - What the user did (e.g. 'calculate', 'change_value')
     * @param {object} [data] - Optional additional data
     */
    const trackUsage = useCallback((action, data = {}) => {
        const event = {
            type: 'TOOL_USAGE',
            tool: toolName,
            action,
            data,
            timestamp: new Date().toISOString()
        };

        // PostMessage to Bubble parent
        try {
            if (window.self !== window.top) {
                window.parent.postMessage(event, getTargetOrigin());
            }
        } catch (e) {
            console.debug('[ToolAnalytics] postMessage failed:', e);
        }

        // Google Analytics (gtag)
        try {
            if (typeof window.gtag === 'function') {
                window.gtag('event', `tool_${action}`, {
                    tool_name: toolName,
                    ...data
                });
            }
        } catch (e) {
            console.debug('[ToolAnalytics] gtag failed:', e);
        }

        console.debug(`[ToolAnalytics] Usage tracked: ${toolName} → ${action}`, data);
    }, [toolName]);

    return { trackUsage };
}
