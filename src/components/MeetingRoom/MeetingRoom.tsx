import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MeetingRoom.css'

export default function MeetingRoom() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    checkIn: '',
    checkOut: '',
    roomType: 'Standard',
    persons: 1
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('http://localhost:3001/api/meetingroom-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.ok && data.success) {
        alert('Meeting room booking submitted!')
        navigate('/')
      } else {
        setError(data.message || 'Booking failed')
      }
    } catch (err) {
      setError('Server error')
    }
  }

  return (
    <div className="booking-container">
      <form className="booking-form" onSubmit={handleContinue}>
        <h2>Meeting Room Booking</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="booking-row">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          name="birthDate"
          placeholder="Birth Date dd/mm/yyyy"
          value={form.birthDate}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Mail"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address Street"
          value={form.address}
          onChange={handleChange}
          required
        />
        <div className="booking-row">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="booking-row">
          <input
            type="datetime-local"
            name="checkIn"
            placeholder="Check In"
            value={form.checkIn}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="checkOut"
            placeholder="Check Out"
            value={form.checkOut}
            onChange={handleChange}
            required
          />
        </div>
        <select
          name="roomType"
          value={form.roomType}
          onChange={handleChange}
          required
        >
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Suite">Suite</option>
        </select>
        <input
          type="number"
          name="persons"
          placeholder="Number of Persons"
          value={form.persons}
          min={1}
          max={10}
          onChange={handleChange}
          required
        />
        <button className="booking-btn" type="submit">Continue</button>
      </form>
      <button className="back-btn" onClick={() => navigate('/')}>Back</button>
    </div>
  )
}