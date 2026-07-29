import React from 'react';
import ToolLandingPage from '../components/ToolLandingPage';
import { TOOLS_DATA } from '../data/toolsData';

export default function ZuladungsrechnerPage() {
    return <ToolLandingPage tool={TOOLS_DATA.zuladungsrechner} />;
}
