// src/app/theme.js
import { createTheme } from '@mui/material/styles';

// Define your custom theme settings here
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // You can replace this with any color you prefer
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
    // You can add more customizations here if needed
});

export default theme;
