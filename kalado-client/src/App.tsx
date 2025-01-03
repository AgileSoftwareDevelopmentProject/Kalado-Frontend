import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
// import './App.css';
import './index.css';
import { Landing, ItemDetails } from './pages';
import AdList from './components/organisms/AdList/AdList';
import React from 'react';
import EditAdCard from './components/organisms/AdCard/EditAdCard';
import pishi1 from './assets/images/pishi1.jpg';
import pishi2 from './assets/images/pishi2.jpg';
import pishi3 from './assets/images/pishi3.jpg';

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
        {/* <Route path="/item/:itemId" element={<ItemDetails />} /> */}
      </Routes>
    </Router>
    </I18nextProvider>
    // <div>
    //   {/* <EditAdCard
    //     title="گربه"
    //     price="۹۰۰۰۰۰۰"
    //     category="حیوان"
    //     date="۱۴۰۳/۱۲/۱۴"
    //     description=" توضیحات گربه"
    //     images={[pishi1, pishi2, pishi3]}
    //     status="فعال"
    //     onEdit={handleEdit}
    //     // onDelete={handleDelete}
    //   /> */}
    //   {/* <AdList /> */}
    // </div>
  );
}

export default App;