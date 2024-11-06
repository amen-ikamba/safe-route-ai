// File: src/app/page.js
'use client';  // Place the 'use client' directive at the top

import { Box, Container } from '@mui/material'; // Importing once
import SOSAlert from '@/components/SOSAlert';

export default function Page() {
    return (
        <div>
            <h1>Welcome to My App</h1>
            <p>This is the homepage.</p>

            {/* SOSAlert from Emergency Page */}
            <Container maxWidth="sm">
                <Box py={4}>
                    <SOSAlert />
                </Box>
            </Container>
        </div>
    );
}
