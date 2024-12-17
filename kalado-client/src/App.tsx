import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Landing from './pages/Landing/Landing';
import ItemDetails from './pages/ItemDetails/ItemDetails';


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
