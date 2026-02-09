import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export function App() {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [attendees,setAttendees]=useState("")
  const [preferences,setPreferences]=useState("")
  const [isChecked, setIsChecked]=useState(false)
  const [isClicked,setIsClicked]=useState(false)

  const handleSubmit=(e)=>{
    e.preventDefault()
    setIsClicked(true)
  }
  const handleChange=()=>{
    setIsChecked(!isChecked)
  }


  return(
    <form className="form" onSubmit={handleSubmit}>
    <h1>Event RSVP Form</h1>
    <label>Name:
    <input type="text" placeholder="Your Name" value={name} required onChange={e=> setName(e.target.value)}/>
    </label>
    <label>Email:
    <input type="email" placeholder="Your Email" value={email} required onChange={e=> setEmail(e.target.value)} />
    </label>
    <label>Number of Attendees:
    <input type="number" placeholder="Number of Attendees" value={attendees}  onChange={e=> setAttendees(e.target.value)} required min="1"/>
    </label>
    <label>Dietary Preferences:
    <input type="text" placeholder="Dietary Preferences (Optional)" value={preferences} onChange={e=>setPreferences(e.target.value)}/>
    </label>
    <label>Bringing additional guests?
    <input type="checkbox" checked={isChecked} onChange={handleChange} />
    </label>
    <button type="submit" >Submit RSVP</button>
    { isClicked && name && email && attendees && <div className="message">
      <h2>RSVP Submitted!</h2>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Number of attendees: {attendees}</p>
      <p>Dietary preferences: {preferences===""? "None": preferences}</p>
      <p>Bringing additional guests: {isChecked? "Yes": "No"}</p>
      </div>
    }
    </form>
  )
}


export default App;
