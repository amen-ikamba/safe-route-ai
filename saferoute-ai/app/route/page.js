'use client'
import { Box, Container } from '@mui/material';
import RoutePlanner from '@/components/RoutePlanner';

export default function RoutePage() {
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <RoutePlanner />
      </Box>
    </Container>
  );
}

// File: src/app/emergency/page.js
'use client'
import { Box, Container } from '@mui/material';
import SOSAlert from '@/components/SOSAlert';

export default function EmergencyPage() {
  return (
    <Container maxWidth="sm">
      <Box py={4}>
        <SOSAlert />
      </Box>
    </Container>
  );
}