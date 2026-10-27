/**
 * Helper to determine the account tier and badge info for a listing or user.
 * 
 * Logic:
 * • Private account -> Privat
 * • Commercial Free -> Gewerblich
 * • Commercial Business -> Business
 * • Paid listing promotion -> additional Hervorgehoben badge (same for admin listings)
 * • Admin created listing -> Only Hervorgehoben (never Privat)
 */
export function getSellerBadgeInfo(itemOrUser) {
    if (!itemOrUser) {
        return {
            tier: 'PRIVATE',
            label: 'Privat',
            labelUpper: 'PRIVAT',
            isBusiness: false,
            isCommercial: false,
            isAdmin: false,
            isPrivate: true
        };
    }

    const sellerObj = itemOrUser.seller || itemOrUser;
    
    // Check if admin account/listing
    const isAdmin = Boolean(
        itemOrUser.seller_role === 'ADMIN' ||
        itemOrUser.role === 'ADMIN' ||
        itemOrUser.seller_type === 'ADMIN' ||
        sellerObj.role === 'ADMIN' ||
        sellerObj.type === 'ADMIN' ||
        itemOrUser.is_admin === true ||
        sellerObj.is_admin === true ||
        itemOrUser.is_campuna_club === true ||
        sellerObj.is_campuna_club === true
    );

    // If it's an admin listing, it must show Campuna (never Privat)
    if (isAdmin) {
        return {
            tier: 'ADMIN',
            label: 'Campuna',
            labelUpper: 'CAMPUNA',
            isBusiness: false,
            isCommercial: false,
            isAdmin: true,
            isPrivate: false
        };
    }

    // Check if commercial
    const isCommercial = Boolean(
        itemOrUser.account_type === 'COMMERCIAL' ||
        itemOrUser.seller_type === 'COMMERCIAL' ||
        itemOrUser.seller_type === 'Gewerblich' ||
        itemOrUser.listing_user_type === 'COMMERCIAL' ||
        itemOrUser.listing_user_type === 'Gewerblich' ||
        sellerObj.type === 'COMMERCIAL' ||
        sellerObj.type === 'Gewerblich' ||
        sellerObj.account_type === 'COMMERCIAL'
    );

    // Check if Business tier (paid commercial plan only!)
    const rawTier = String(
        itemOrUser.company_tier ||
        itemOrUser.seller_tier ||
        itemOrUser.tier ||
        sellerObj.tier ||
        sellerObj.company_tier ||
        ''
    ).toUpperCase();

    const isBusiness = isCommercial && Boolean(
        rawTier === 'BUSINESS' ||
        itemOrUser.is_business === true ||
        sellerObj.is_business === true ||
        sellerObj.is_strategic_partner === true
    );

    if (isBusiness) {
        return {
            tier: 'BUSINESS',
            label: 'Business',
            labelUpper: 'BUSINESS',
            isBusiness: true,
            isCommercial: true,
            isAdmin: false,
            isPrivate: false
        };
    }

    if (isCommercial) {
        return {
            tier: 'COMMERCIAL',
            label: 'Gewerblich',
            labelUpper: 'GEWERBLICH',
            isBusiness: false,
            isCommercial: true,
            isAdmin: false,
            isPrivate: false
        };
    }

    return {
        tier: 'PRIVATE',
        label: 'Privat',
        labelUpper: 'PRIVAT',
        isBusiness: false,
        isCommercial: false,
        isAdmin: false,
        isPrivate: true
    };
}

/**
 * Helper to determine if a listing is boosted / highlighted via a paid boost.
 */
export function isListingBoosted(item) {
    if (!item) return false;
    
    // Explicit featured/boosted property check
    if (item.is_boosted === true || item.is_boosted === 'true' || item.isBoosted === true || item.isExclusive === true) {
        return true;
    }

    if (item.boosted_until !== undefined && item.boosted_until !== null) {
        const untilDate = new Date(item.boosted_until);
        return !isNaN(untilDate.getTime()) && untilDate > new Date();
    }

    return false;
}
