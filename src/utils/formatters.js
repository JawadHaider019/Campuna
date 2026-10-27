/**
 * Campuna Utility Formatters
 * Consistent German formatting for conditions, prices, numbers, and locations.
 */

/**
 * Translates and normalizes listing condition into German.
 */
export function formatCondition(cond) {
    if (!cond) return 'Gebraucht';
    const c = String(cond).toLowerCase().trim();

    if (c === 'like new' || c === 'like_new' || c.includes('wie neu') || c.includes('neuwertig') || c.includes('top zustand') || c.includes('mint') || c.includes('excellent')) {
        return 'Wie neu';
    }
    if (c === 'new' || c === 'brand new' || c === 'brand_new' || c === 'neu' || c.includes('fabrikneu')) {
        return 'Neu';
    }
    if (c === 'good' || c.includes('sehr gut') || c.includes('sehr_gut') || c.includes('very good')) {
        return 'Sehr gut';
    }
    if (c === 'gut') {
        return 'Gut';
    }
    if (c === 'used' || c.includes('gebraucht')) {
        return 'Gebraucht';
    }
    if (c.includes('fair') || c.includes('akzeptabel') || c.includes('zufriedenstellend') || c.includes('acceptable')) {
        return 'Akzeptabel';
    }
    if (c.includes('defect') || c.includes('defekt') || c.includes('bastler') || c.includes('beschädigt') || c.includes('damaged') || c.includes('for parts')) {
        return 'Defekt / Bastler';
    }

    if (['Neu', 'Wie neu', 'Sehr gut', 'Gut', 'Gebraucht', 'Akzeptabel', 'Defekt / Bastler'].includes(cond)) {
        return cond;
    }

    return 'Gebraucht';
}

/**
 * Formats price with German decimal comma.
 */
export function formatPrice(price, includeCurrency = true) {
    if (price === null || price === undefined || price === '' || isNaN(Number(price))) {
        return 'Preis VB';
    }
    const num = typeof price === 'number' ? price : parseFloat(price) || 0;
    if (num <= 0) return 'Preis VB';

    // Format with thousand separator and decimal comma: e.g. 36.900 € or 75 €
    const formatted = num % 1 === 0
        ? num.toLocaleString('de-DE')
        : num.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return includeCurrency ? `${formatted} €` : formatted;
}

/**
 * Formats full dynamic listing price with prefix (Ab), suffix (/ Tag, etc.), and VB.
 */
export function formatListingPrice(item, options = {}) {
    if (!item) return 'Preis VB';

    const priceType = String(item.price_type || item.priceType || options.priceType || 'FIXED').trim().toUpperCase();
    const isNegotiable = Boolean(item.negotiable || item.isNegotiable || options.negotiable);
    const rawPrice = item.price !== undefined ? item.price : options.price;

    if (priceType === 'ON_REQUEST' || priceType === 'AUF_ANFRAGE') {
        return 'Preis auf Anfrage';
    }

    if (priceType === 'FREE' || priceType === 'VERSCHENKEN') {
        return 'Zu verschenken';
    }

    const num = typeof rawPrice === 'number' ? rawPrice : parseFloat(rawPrice) || 0;
    if (num <= 0 && isNegotiable) {
        return 'Preis VB';
    }
    if (num <= 0) {
        return 'Preis auf Anfrage';
    }

    const formattedPrice = formatPrice(num);

    let prefix = '';
    if (priceType === 'STARTING_AT' || priceType === 'AB') {
        prefix = 'Ab ';
    }

    let suffix = '';
    const category = item.category || '';
    if (priceType === 'PER_DAY' || priceType === 'PRO_TAG' || category === 'Mieten & Vermieten' || item.pricePeriod === 'pro Tag') {
        suffix = ' / Tag';
    } else if (priceType === 'PER_NIGHT' || priceType === 'PRO_NACHT') {
        suffix = ' / Nacht';
    } else if (priceType === 'PER_WEEK' || priceType === 'PRO_WOCHE') {
        suffix = ' / Woche';
    } else if (priceType === 'PER_MONTH' || priceType === 'PRO_MONAT') {
        suffix = ' / Monat';
    } else if (priceType === 'PER_HOUR' || priceType === 'PRO_STUNDE') {
        suffix = ' / Std.';
    }

    const vb = (isNegotiable && !options.hideVB) ? ' VB' : '';

    return `${prefix}${formattedPrice}${suffix}${vb}`;
}

/**
 * Cleans location string to City, State/Country.
 */
export function formatCleanLocation(location) {
    if (!location) return 'Deutschland';
    let loc = typeof location === 'string' ? location.trim() : (location.address || 'Deutschland');
    if (!loc || /^-?\d+\.\d+,\s*-?\d+\.\d+$/.test(loc)) return 'Deutschland';

    const rawParts = loc.split(',').map(p => p.trim()).filter(Boolean);
    if (rawParts.length === 0) return 'Deutschland';

    const country = rawParts[rawParts.length - 1].replace(/^\d+[\s\-]*/, '').trim() || 'Deutschland';
    let cityPart = rawParts.length > 1 ? rawParts[rawParts.length - 2] : rawParts[0];

    cityPart = cityPart.replace(/^[\d\s\-_]+/, '').trim();

    if (!cityPart) {
        for (let i = rawParts.length - 1; i >= 0; i--) {
            const candidate = rawParts[i].replace(/^[\d\s\-_]+/, '').trim();
            if (candidate && candidate.toLowerCase() !== country.toLowerCase()) {
                cityPart = candidate;
                break;
            }
        }
    }

    if (!cityPart) cityPart = country;

    if (country.toLowerCase() !== cityPart.toLowerCase() && !/^\d+$/.test(country)) {
        return `${cityPart}, ${country}`;
    }
    return cityPart;
}

/**
 * Checks if a listing is marked as sold ('Verkauft' / 'SOLD').
 */
export function isListingSold(item) {
    if (!item) return false;
    const status = String(item.status || item.Status || '').trim().toUpperCase();
    const condition = String(item.condition || item['Condition item'] || '').trim().toUpperCase();
    const title = String(item.title || item.Title || '').trim().toLowerCase();

    return Boolean(
        status === 'SOLD' ||
        status === 'VERKAUFT' ||
        item.is_sold === true ||
        item.sold === true ||
        condition === 'VERKAUFT' ||
        condition === 'SOLD' ||
        title.startsWith('verkauft') ||
        title.startsWith('[verkauft]') ||
        title.startsWith('(verkauft)')
    );
}

/**
 * Formats views count with German locale.
 */
export function formatViews(views) {
    const count = parseInt(views || 0, 10);
    return count.toLocaleString('de-DE');
}
