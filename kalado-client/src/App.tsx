import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import ThemeProvider from './theme/ThemeProvider';
import i18n from './i18n';
import CssBaseline from '@mui/material/CssBaseline';
import { CustomToast } from './components/molecules';
import { Landing, ItemDetails, UserDashboard, AdminDashboard } from './pages';
import store from './redux/store';
import './index.css';


function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/item/:itemId" element={<ItemDetails />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
            <CustomToast />
          </Router>
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  );
}

export default App;