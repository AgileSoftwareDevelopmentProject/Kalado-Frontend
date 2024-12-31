// theme.ts
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#D74101', // Button color
            contrastText: '#FFFFFF', // Text color for buttons
        },
        secondary: {
            main: '#D74101', // Secondary actions or accents
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#ffffff', // Light mode background color
            paper: '#ffffff',
        },
        text: {
            primary: '#000000', // Black text for light mode
            secondary: '#333333', // Dark gray text for light mode
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#272C48', // Set button text color to black in light mode
                },
            },
        },
        MuiBox: {
            styleOverrides: {
                root: {
                    backgroundColor: '#272C48', // Set Box background color for both modes
                    color: 'inherit', // Inherit text color, can be overridden by child components
                },
            },
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#D74101', // Button color
            contrastText: '#FFFFFF', // Text color for buttons
        },
        secondary: {
            main: '#D74101',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#272C48', // Dark mode background color
            paper: '#424242',
        },
        text: {
            primary: '#FFFFFF',  // White text for dark mode
            secondary: '#e0e0e0', // Light gray text for dark mode
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF', // Default text color for buttons in dark mode
                },
            },
        },
        MuiBox: {
            styleOverrides: {
                root: {
                    backgroundColor: '#272C48', // Set Box background color for both modes
                    color: 'inherit', // Inherit text color, can be overridden by child components
                },
            },
        },
    },
});
