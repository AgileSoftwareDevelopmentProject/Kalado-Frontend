import { createTheme } from '@mui/material/styles';


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
            paper: '#272C48',  // Card, Item details
        },
        text: {
            primary: '#FFFFFF',  // White text for dark mode
            secondary: '#e0e0e0', // Light gray text for dark mode
        },
    },
    typography: {
        fontFamily: 'IranSans, Nazanin, Lotus, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF', // Default text color for buttons in dark mode
                    textTransform: 'none', // Prevent uppercase transformation
                },
            },
        },
        MuiBox: {
            styleOverrides: {
                root: {
                    backgroundColor: '#272C48', // Set Box background color for dark mode
                    // color: 'inherit', // Inherit text color, can be overridden by child components
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    '&::placeholder': {
                        color: 'lightgray', // Change this to your desired placeholder color for dark mode
                        opacity: 1,
                    },
                },
                notchedOutline: {
                    borderColor: 'lightgray', // Optional for dark mode border styling
                },
            },
        },
    },
});
