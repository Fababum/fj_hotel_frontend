import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './SignIn.css'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      // Beispiel-API-Aufruf an dein Backend
      const res = await fetch('http://localhost:3001/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        navigate('/')
      } else {
        setError(data.message || 'Wrong email or password')
      }
    } catch (err) {
      setError('Server error')
    }
  }

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSignIn}>
        <h2>Sign In</h2>
        <input
          type="email"
          placeholder="Mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <button className="signin-btn" type="submit">Sign In</button>
      </form>
      <Link to="/register" style={{ marginBottom: '1rem', display: 'block', textAlign: 'center' }}>
        Don't have an account? Register
      </Link>
      <button className="back-btn" onClick={() => navigate('/')}>Back</button>
    </div>
  )
}