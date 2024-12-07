import { useState } from 'react'
import './App.css'
import CodeVerification from './components/Signup/CodeVerification'

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
      <nav>
        <button onClick={handleSignupClick}>Sign Up</button>
      </nav>
      {isSignupOpen && (
        <CodeVerification onClose={handleCloseSignup} email="f@gmail.com" />
      )}
    </div>
  )
}

export default App
