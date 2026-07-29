import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ToolLandingPage from '../components/ToolLandingPage';
import { getToolBySlug, TOOLS_DATA } from '../data/toolsData';

export default function CampingHelferPage({ initialTool }) {
    const { slug } = useParams();
    const location = useLocation();

    // Resolve tool based on route params, location path, or explicit initialTool prop
    const targetSlug = slug || initialTool || (
        location.pathname.includes('reisekostenrechner')
            ? 'reisekostenrechner'
            : location.pathname.includes('zuladungsrechner')
                ? 'zuladungsrechner'
                : 'zuladungsrechner'
    );

    const tool = getToolBySlug(targetSlug) || TOOLS_DATA.zuladungsrechner;

    return <ToolLandingPage tool={tool} />;
}
