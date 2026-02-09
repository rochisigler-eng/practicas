import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [password, setPassword] = useState("")
  const [count, setCount] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isExpired, setIsExpired] = useState(false)


  const generateOtp = () => {
    let otp = ""
    while (otp.length < 6) {
      otp += Math.floor(Math.random() * 10);
    }
    setPassword(otp)
    setCount(5)
    setIsActive(true)
    setIsExpired(false)
  }

  useEffect(() => {
    if (!isActive || count === 0) return;

    const intervalId = setInterval(() => {
      setCount(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, count]);

  useEffect(() => {
    if (count === 0 && isActive) {
      setIsExpired(true);
      setIsActive(false);
    }
  }, [count, isActive]);

  return (
    <div className="container">
      <h1 id="otp-title">OTP Generator</h1>
      <h2 id="otp-display">{isActive ? password : "Click 'Generate OTP' to get a code"}</h2>
      <p id="otp-timer" aria-live="polite">
        {isActive && `Expires in: ${count} seconds`}
        {isExpired && "OTP expired. Click the button to generate a new OTP."}
      </p>
      <button id="generate-otp-button"
        onClick={generateOtp}
        disabled={isActive}
        style={{ cursor: isActive ? "not-allowed" : "pointer" }}
      >
        Generate OTP
      </button>
    </div>
  )
};

export default App;
