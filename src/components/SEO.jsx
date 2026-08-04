import React from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://campuna.de';

/**
 * Reusable SEO component for per-page head management.
 *
 * @param {Object} props
 * @param {string} props.title          - Page <title>
 * @param {string} props.description    - Meta description
 * @param {string} props.canonicalPath  - Relative path for canonical URL (e.g. 'camping-helfer/zuladungsrechner')
 * @param {Object} [props.structuredData] - Optional JSON-LD structured data object
 * @param {string} [props.lang]         - HTML lang attribute (defaults to 'de')
 */
export default function SEO({ title, description, canonicalPath, structuredData, lang = 'de' }) {
    const canonicalUrl = canonicalPath
        ? `${BASE_URL}/${canonicalPath.replace(/^\/+/, '')}`
        : BASE_URL;

    return (
        <Helmet>
            <html lang={lang} />
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Campuna®" />
            <meta property="og:locale" content="de_DE" />

            {/* Structured Data (JSON-LD) */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
}
