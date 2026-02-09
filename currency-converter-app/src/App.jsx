import { useState, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

 function App() {
  const [input, setInput] = useState(1)
  const [startCurrency, setStartCurrency] = useState("USD")
  const [targetCurrency, setTargetCurrency] = useState("EUR")

  const currency = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
    JPY: 166.7
  }

  const baseAmount = useMemo(() => {
    const startValue = currency[startCurrency]
    if (!startValue) return 0
    return input / startValue
  }, [input, startCurrency])

  const convertedAmount = (
    baseAmount * currency[targetCurrency]
  ).toFixed(2)


  return (
    <div className="container">
      <form className="form">
        <h1>Currency Converter</h1>
        <label htmlFor="convertion-input">USD to EUR Conversion</label>
        <input id="convertion-input" type="number" value={input} onChange={(e) => setInput(Number(e.target.value))} />
        <label htmlFor="from">Start Currency:</label>
        <select id="from" value={startCurrency} onChange={(e) => setStartCurrency(e.target.value)}>
          {Object.entries(currency).map(([key, value]) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        <label htmlFor="to">Target Currency:</label>
        <select id="to" value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
          {Object.entries(currency).map(([key, value]) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        <p>Converted Amount:  {convertedAmount} {targetCurrency} </p>
      </form>
    </div>
  )

}

export default App;