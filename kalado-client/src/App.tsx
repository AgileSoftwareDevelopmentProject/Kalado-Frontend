import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdList from './components/organisms/AdList/AdList';

function App() {
  const handleEdit = (data: any) => {
    console.log('Edited Data:', data);
  };

  const handleDelete = () => {
    console.log('Ad Deleted');
  };

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          <Route path="/" element={<AdList />} />
        </Routes>
      </Router>
      <ToastContainer />
    </I18nextProvider>
  );
}

export default App;
