import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './theme';
import { CustomToast } from './components/molecules';
import { Landing, ItemDetails, UserDashboard, AdminDashboard } from './pages';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <AuthProvider>
                  <Landing toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                </AuthProvider>}
            />
            <Route path="/item/:itemId" element={<ItemDetails />} />
            <Route path="/user-dashboard" element={
              <AuthProvider>
                <UserDashboard toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
              </AuthProvider>}
            />
            <Route path="/admin-dashboard" element={
              <AuthProvider>
                <AdminDashboard toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
              </AuthProvider>}
            />
          </Routes>
        </Router>
        <CustomToast />
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
