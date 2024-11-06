// File: src/app/route/page.js
'use client';  // Place the 'use client' directive at the top

import { Box, Container } from '@mui/material'; // Importing once
import RoutePlanner from '@/components/RoutePlanner';

export default function RoutePage() {
    return (
        <Container maxWidth="lg" sx={{ height: '100vh', padding: 0 }}>
            <Box sx={{ height: '100%' }}>
                <RoutePlanner /> {/* Displays both the route planner and map */}
            </Box>
        </Container>
    );
}


// File: src/app/emergency/page.js
import SOSAlert from '@/components/SOSAlert';


export function EmergencyPage() {
  return (
    <Container maxWidth="sm">
      <Box py={4}>
        <SOSAlert />
      </Box>
    </Container>
  );
}