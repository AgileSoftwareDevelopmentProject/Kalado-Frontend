import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import CssBaseline from '@mui/material/CssBaseline';
import { CustomToast } from './components/molecules';
import { Landing, ItemDetails, UserDashboard, AdminDashboard } from './pages';
import './index.css';
import { AuthProvider, ThemeProvider, ModalProvider, LanguageProvider } from './contexts';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <CssBaseline />
            <Router>
              <ModalProvider>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/item/:itemId" element={<ItemDetails />} />
                  <Route path="/user-dashboard" element={<UserDashboard />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                </Routes>
              </ModalProvider>
            </Router>
            <CustomToast />
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;
