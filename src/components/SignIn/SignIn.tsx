import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './SignIn.css'

const fakeUser = {
  email: 'demo@fjhotel.com',
  password: 'fjhotel2025'
}

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === fakeUser.email && password === fakeUser.password) {
      setError('')
      navigate('/')
    } else {
      setError('Wrong email or password')
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