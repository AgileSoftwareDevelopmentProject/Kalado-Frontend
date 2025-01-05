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
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={
              <AuthProvider>
                <LanguageProvider>
                  <ModalProvider>
                    <Landing />
                  </ModalProvider>
                </LanguageProvider>
              </AuthProvider>}
            />
            <Route path="/item/:itemId" element={
              <AuthProvider>
                <LanguageProvider>
                  <ModalProvider>
                    <ItemDetails />
                  </ModalProvider>
                </LanguageProvider>
              </AuthProvider>
            } />
            <Route path="/user-dashboard" element={
              <AuthProvider>
                <LanguageProvider>
                  <ModalProvider>
                    <UserDashboard />
                  </ModalProvider>
                </LanguageProvider>
              </AuthProvider>}
            />
            <Route path="/admin-dashboard" element={
              <AuthProvider>
                <LanguageProvider>
                  <ModalProvider>
                    <AdminDashboard />
                  </ModalProvider>
                </LanguageProvider>
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