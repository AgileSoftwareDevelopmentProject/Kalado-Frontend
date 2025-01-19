import React from 'react';
import { useSelector } from 'react-redux';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';


const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    return (
        <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            {children}
        </MuiThemeProvider>
    );
};

export default ThemeProvider;