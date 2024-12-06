import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignupForm from './components/Signup/SignupForm'

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
        <SignupForm onClose={handleCloseSignup} />
      )}
    </div>
  )
}

export default App
