/**
 * Simple mapping of German 2-digit postal code prefixes (Leitregionen) to federal states.
 */
const plzToState = {
    '01': 'Sachsen',
    '02': 'Sachsen',
    '03': 'Brandenburg',
    '04': 'Sachsen',
    '06': 'Sachsen-Anhalt',
    '07': 'Thüringen',
    '08': 'Sachsen',
    '09': 'Sachsen',
    '10': 'Berlin',
    '11': 'Berlin',
    '12': 'Berlin',
    '13': 'Berlin',
    '14': 'Brandenburg',
    '15': 'Brandenburg',
    '16': 'Brandenburg',
    '17': 'Mecklenburg-Vorpommern',
    '18': 'Mecklenburg-Vorpommern',
    '19': 'Mecklenburg-Vorpommern',
    '20': 'Hamburg',
    '21': 'Niedersachsen',
    '22': 'Hamburg',
    '23': 'Schleswig-Holstein',
    '24': 'Schleswig-Holstein',
    '25': 'Schleswig-Holstein',
    '26': 'Niedersachsen',
    '27': 'Bremen',
    '28': 'Bremen',
    '29': 'Niedersachsen',
    '30': 'Niedersachsen',
    '31': 'Niedersachsen',
    '32': 'Nordrhein-Westfalen',
    '33': 'Nordrhein-Westfalen',
    '34': 'Hessen',
    '35': 'Hessen',
    '36': 'Hessen',
    '37': 'Niedersachsen',
    '38': 'Niedersachsen',
    '39': 'Sachsen-Anhalt',
    '40': 'Nordrhein-Westfalen',
    '41': 'Nordrhein-Westfalen',
    '42': 'Nordrhein-Westfalen',
    '43': 'Nordrhein-Westfalen',
    '44': 'Nordrhein-Westfalen',
    '45': 'Nordrhein-Westfalen',
    '46': 'Nordrhein-Westfalen',
    '47': 'Nordrhein-Westfalen',
    '48': 'Nordrhein-Westfalen',
    '49': 'Niedersachsen',
    '50': 'Nordrhein-Westfalen',
    '51': 'Nordrhein-Westfalen',
    '52': 'Nordrhein-Westfalen',
    '53': 'Nordrhein-Westfalen',
    '54': 'Rheinland-Pfalz',
    '55': 'Rheinland-Pfalz',
    '56': 'Rheinland-Pfalz',
    '57': 'Nordrhein-Westfalen',
    '58': 'Nordrhein-Westfalen',
    '59': 'Nordrhein-Westfalen',
    '60': 'Hessen',
    '61': 'Hessen',
    '63': 'Bayern',
    '64': 'Hessen',
    '65': 'Hessen',
    '66': 'Saarland',
    '67': 'Rheinland-Pfalz',
    '68': 'Baden-Württemberg',
    '69': 'Baden-Württemberg',
    '70': 'Baden-Württemberg',
    '71': 'Baden-Württemberg',
    '72': 'Baden-Württemberg',
    '73': 'Baden-Württemberg',
    '74': 'Baden-Württemberg',
    '75': 'Baden-Württemberg',
    '76': 'Baden-Württemberg',
    '77': 'Baden-Württemberg',
    '78': 'Baden-Württemberg',
    '79': 'Baden-Württemberg',
    '80': 'Bayern',
    '81': 'Bayern',
    '82': 'Bayern',
    '83': 'Bayern',
    '84': 'Bayern',
    '85': 'Bayern',
    '86': 'Bayern',
    '87': 'Bayern',
    '88': 'Baden-Württemberg',
    '89': 'Baden-Württemberg',
    '90': 'Bayern',
    '91': 'Bayern',
    '92': 'Bayern',
    '93': 'Bayern',
    '94': 'Bayern',
    '95': 'Bayern',
    '96': 'Bayern',
    '97': 'Bayern',
    '98': 'Thüringen',
    '99': 'Thüringen'
};

/**
 * Formats a raw address string into a privacy-friendly format showing only:
 * "City/Region, Federal State"
 * Removes street names, postal codes, exact house numbers, and country name ("Deutschland").
 * Handles both typical API location data and local placeholder layouts.
 * 
 * @param {string} address - The raw address string
 * @returns {string} The privacy-friendly city and state representation
 */
export function formatLocation(address) {
    if (!address) return '';
    let cleanAddress = address.trim().replace(/,\s*(Deutschland|Germany)\s*$/i, '');
    const parts = cleanAddress.split(',').map(p => p.trim()).filter(Boolean);
    if (parts.length === 0) return '';

    // Check if the overall address contains a PLZ
    let plz = '';
    let plzPartIndex = -1;
    for (let i = parts.length - 1; i >= 0; i--) {
        const plzMatch = parts[i].match(/\b\d{2,5}\b/);
        if (plzMatch) {
            plz = plzMatch[0];
            plzPartIndex = i;
            break;
        }
    }

    let city = '';
    let state = '';

    if (plzPartIndex !== -1) {
        // Found a PLZ, strip it and clean the city/region name
        let target = parts[plzPartIndex];
        target = target.replace(plz, '').trim();
        city = target
            .replace(/\([^)]*\)/g, '')
            .split('-')[0]
            .trim();
        city = city.replace(/^[^a-zA-ZäöüÄÖÜß]+/g, '').replace(/[^a-zA-ZäöüÄÖÜß]+$/g, '').trim();

        if (!city && plzPartIndex > 0) {
            // E.g. "Biesenbach 48, 51381"
            city = parts[plzPartIndex - 1].replace(/\d+$/, '').trim();
        }

        let prefix = plz;
        if (plz.length > 2) {
            prefix = plz.padStart(5, '0').substring(0, 2);
        } else if (plz.length < 2) {
            prefix = plz.padStart(2, '0');
        }
        state = plzToState[prefix] || '';
    } else {
        // No PLZ found, format directly from parts (e.g. "Trebbin, Brandenburg" or "Bruchsal, BW")
        city = parts[0].replace(/\([^)]*\)/g, '').split('-')[0].trim();
        city = city.replace(/^[^a-zA-ZäöüÄÖÜß]+/g, '').replace(/[^a-zA-ZäöüÄÖÜß]+$/g, '').trim();

        if (parts.length > 1) {
            const rawState = parts[1].trim();
            if (rawState === 'BW') state = 'Baden-Württemberg';
            else if (rawState === 'NRW') state = 'Nordrhein-Westfalen';
            else if (rawState === 'BY') state = 'Bayern';
            else if (rawState === 'HE') state = 'Hessen';
            else if (rawState === 'TH') state = 'Thüringen';
            else if (rawState === 'BB') state = 'Brandenburg';
            else if (rawState === 'RP') state = 'Rheinland-Pfalz';
            else if (rawState === 'SL') state = 'Saarland';
            else if (rawState === 'SN') state = 'Sachsen';
            else if (rawState === 'ST') state = 'Sachsen-Anhalt';
            else if (rawState === 'MV') state = 'Mecklenburg-Vorpommern';
            else if (rawState === 'NI') state = 'Niedersachsen';
            else if (rawState === 'HB') state = 'Bremen';
            else state = rawState;
        }
    }

    if (city && state) {
        return `${city}, ${state}`;
    } else if (city) {
        return city;
    } else {
        return address;
    }
}
