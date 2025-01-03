import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import CssBaseline from "@mui/material/CssBaseline";
import { CustomToast } from "./components/molecules";
import AdminDashboard from "./pages/Dashboards/AdminDashboard"; // Import AdminDashboard
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<AdminDashboard />} /> {/* Show AdminDashboard */}
            </Routes>
          </AuthProvider>
        </Router>
        <CustomToast />
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
