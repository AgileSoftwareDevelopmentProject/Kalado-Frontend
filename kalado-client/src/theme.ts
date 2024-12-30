// theme.ts
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2', // Light primary color
        },
        secondary: {
            main: '#dc004e', // Light secondary color
        },
        background: {
            default: '#ffffff', // Light background color
            paper: '#f5f5f5',   // Light paper color (for cards, etc.)
        },
        text: {
            primary: '#000000', // Black text for light mode
            secondary: '#333333', // Dark gray text for light mode
        },
    },
    typography: {
        fontFamily: [
            'IranSans',
            'Nazanin',
            'Lotus',
            'Inter',
            'system-ui',
            'Avenir',
            'Helvetica',
            'Arial',
            'sans-serif'
        ].join(','),
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9', // Dark primary color
        },
        secondary: {
            main: '#f48fb1', // Dark secondary color
        },
        background: {
            default: '#272C48', // Dark background color
            paper: '#424242',   // Dark paper color (for cards, etc.)
        },
        text: {
            primary: '#ffffff', // White text for dark mode
            secondary: '#e0e0e0', // Light gray text for dark mode
        },
    },
    typography: {
        fontFamily: [
            'IranSans',
            'Nazanin',
            'Lotus',
            'Inter',
            'system-ui',
            'Avenir',
            'Helvetica',
            'Arial',
            'sans-serif'
        ].join(','),
    },
});
