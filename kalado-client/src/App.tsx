import { useState } from 'react'
import './App.css'
import CodeVerification from './components/Signup/CodeVerification'
import Filter from './components/Filter/Filter';
import CategorySidebar from './components/Category/Category';
import Navbar from './components/Navbar/Navbar';
import BlueBackground from './components/BlueBackground/BlueBackground';

function App() {
  const [isSignupOpen, setSignupOpen] = useState(false);

  const handleSignupClick = () => {
    setSignupOpen(true);
  };

  const handleCloseSignup = () => {
    setSignupOpen(false);
  };

  return (
    <div>
      <BlueBackground />
      <Navbar />
      <CategorySidebar />
      <Filter />
      {/* <nav>
        <button onClick={handleSignupClick}>Sign Up</button>
      </nav>
      {isSignupOpen && (
        <CodeVerification onClose={handleCloseSignup} email="f@gmail.com" />
      )} */}
    </div>
  )
}

export default App
