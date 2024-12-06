import { useState } from 'react'
import './App.css'

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
    </div>
  )
}

export default App
