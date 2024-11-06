// File: src/components/SOSAlert.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const SOSAlert = () => {
    const handleAlert = () => {
        // Example action for the SOS alert
        alert('SOS Alert triggered!');
    };

    return (
        <Box
            sx={{
                padding: 2,
                backgroundColor: 'red',
                color: 'white',
                borderRadius: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h6">Emergency Alert</Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
                Please take action immediately. Something urgent needs your attention.
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleAlert}>
                Trigger SOS Alert
            </Button>
        </Box>
    );
};

export default SOSAlert;
