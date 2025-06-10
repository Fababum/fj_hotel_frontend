import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

type Picture = {
  picture_id: number
  file_name: string
  mime_type: string
  image_data: string // base64 from backend
}

type Room = {
  room_id: number
  room_name: string
  capacity: number
  room_type: string
  category: string
  price: number
  picture: Picture | null
}

export default function RoomFullView() {
  const [room, setRoom] = useState<Room | null>(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  // Expect room_id from location.state (after booking)
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

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 12, boxShadow: '0 8px 25px rgba(0,0,0,0.08)' }}>
      <h1>{room.room_name}</h1>
      {room.picture ? (
        <img
          src={`data:${room.picture.mime_type};base64,${room.picture.image_data}`}
          alt={room.picture.file_name}
          style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 8, marginBottom: 24 }}
        />
      ) : (
        <div style={{ width: '100%', height: 300, background: '#eee', borderRadius: 8, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span>No image available</span>
        </div>
      )}
      <div style={{ textAlign: 'left', fontSize: '1.1rem' }}>
        <p><strong>Type:</strong> {room.room_type}</p>
        <p><strong>Category:</strong> {room.category}</p>
        <p><strong>Capacity:</strong> {room.capacity} persons</p>
        <p><strong>Price:</strong> {room.price} € / night</p>
      </div>
      <button style={{ marginTop: 32 }} onClick={() => navigate('/')}>Back to Home</button>
    </div>
  )
}