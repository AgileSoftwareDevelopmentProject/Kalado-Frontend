import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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
    palette: {
        background: {
            default: '#272C48',
        },
    },
});

export default theme;
