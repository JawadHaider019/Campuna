/**
 * Optimizes Bubble CDN image URLs by adding Cloudflare Image Resizing parameters.
 * Converts heavy HEIC/PNG/JPEG files into auto-formatted (WebP/AVIF) resized images.
 *
 * @param {string} url - Original image URL
 * @param {number} width - Target display width in pixels (default 800)
 * @param {number} quality - Image compression quality 1-100 (default 80)
 * @returns {string} Optimized image URL
 */
export function optimizeBubbleImageUrl(url, width = 800, quality = 80) {
  if (!url || typeof url !== 'string') return '';
  let formattedUrl = url.trim();
  if (formattedUrl.startsWith('//')) {
    formattedUrl = `https:${formattedUrl}`;
  }

  if (formattedUrl.includes('cdn.bubble.io')) {
    if (!formattedUrl.includes('cdn-cgi/image/')) {
      formattedUrl = formattedUrl.replace(
        /(https:\/\/[^/]+\.cdn\.bubble\.io\/)(f[0-9x]+\/)/,
        `$1cdn-cgi/image/f=auto,w=${width},q=${quality},fit=cover/$2`
      );
    }
  }
  return formattedUrl;
}
