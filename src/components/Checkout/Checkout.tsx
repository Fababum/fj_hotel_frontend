import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type Room = {
  room_id: number
  room_name: string
  price: number
  category: string
}

export default function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [room, setRoom] = useState<Room | null>(null)
  const [error, setError] = useState('')
  const [payment, setPayment] = useState({
    cardholder_name: '',
    card_number: '',
    expiry_month: '',
    expiry_year: '',
    cvv: '',
    billing_address: ''
  })
  const [success, setSuccess] = useState(false)

  // room_id should be passed via location.state from previous page
  const roomId = location.state?.room_id

  useEffect(() => {
    if (!roomId) {
      setError('No room selected.')
      return
    }
    fetch(`http://localhost:3001/api/rooms/${roomId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.room) {
          setRoom(data.room)
        } else {
          setError('Room not found.')
        }
      })
      .catch(() => setError('Server error'))
  }, [roomId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayment({ ...payment, [e.target.name]: e.target.value })
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!room) return
    try {
      const res = await fetch('http://localhost:3001/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_id: room.room_id,
          ...payment
        })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSuccess(true)
        setTimeout(() => navigate('/'), 2000)
      } else {
        setError(data.message || 'Checkout failed')
      }
    } catch {
      setError('Server error')
    }
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    )
  }

  if (!room) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</div>
  }

  if (success) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Payment successful!</h2>
        <p>Thank you for your booking.</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 12, boxShadow: '0 8px 25px rgba(0,0,0,0.08)' }}>
      <h2>Checkout</h2>
      <div style={{ marginBottom: 24 }}>
        <strong>Room:</strong> {room.room_name}<br />
        <strong>Category:</strong> {room.category}<br />
        <strong>Price:</strong> {room.price} € / night
      </div>
      <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input
          type="text"
          name="cardholder_name"
          placeholder="Cardholder Name"
          value={payment.cardholder_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="card_number"
          placeholder="Card Number"
          value={payment.card_number}
          onChange={handleChange}
          maxLength={16}
          required
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            name="expiry_month"
            placeholder="MM"
            value={payment.expiry_month}
            onChange={handleChange}
            maxLength={2}
            required
          />
          <input
            type="text"
            name="expiry_year"
            placeholder="YYYY"
            value={payment.expiry_year}
            onChange={handleChange}
            maxLength={4}
            required
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={payment.cvv}
            onChange={handleChange}
            maxLength={4}
            required
          />
        </div>
        <input
          type="text"
          name="billing_address"
          placeholder="Billing Address"
          value={payment.billing_address}
          onChange={handleChange}
          required
        />
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <button type="submit" style={{ marginTop: 16 }}>Pay & Book</button>
      </form>
    </div>
  )
}