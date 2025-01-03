import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import CssBaseline from '@mui/material/CssBaseline';
import { CustomToast } from './components/molecules';
import { Landing, ItemDetails, UserDashboard, AdminDashboard } from './pages';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';


function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <AuthProvider>
                  <Landing />
                </AuthProvider>}
            />
            <Route path="/item/:itemId" element={<ItemDetails />} />
            <Route path="/user-dashboard" element={
              <AuthProvider>
                <UserDashboard />
              </AuthProvider>}
            />
            <Route path="/admin-dashboard" element={
              <AuthProvider>
                <AdminDashboard />
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