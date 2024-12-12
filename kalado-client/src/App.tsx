import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import ItemDetails from './pages/ItemDetails/ItemDetails';
import CodeVerification from './components/Signup/CodeVerification'
import Filter from './components/Filter/Filter';
import CategorySidebar from './components/Category/Category';
import Navbar from './components/Navbar/Navbar';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/item/:itemId" element={<ItemDetails />} />
      </Routes>
    </Router>
  )
}

export default App;
