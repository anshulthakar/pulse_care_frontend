import { useState, FormEvent } from 'react'
import { useFrappeAuth } from 'frappe-react-sdk'
import './Login.css'
import { useNavigate } from 'react-router-dom'

function Login() {
  const { login } = useFrappeAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login({ username, password })
      navigate('/')
    } catch (err) {
      setError('Incorrect email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-brand">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="brand-top">
        <div className="brand-mark">P</div>
        <span className="brand-name">Pulse Care</span>
      </div>

        <div className="brand-mid">
          <div className="brand-eyebrow">Staff portal</div>
          <h1 className="brand-headline">Every patient,<br />one clear signal.</h1>
          <p className="brand-sub">
            Registration, records, and billing in one place —
            built for the pace of a real hospital floor.
          </p>
          <div className="pulse-wrap">
          <svg viewBox="0 0 400 90" width="100%" height="100%">
            <path
              className="pulse-line"
              d="M0,45 L90,45 L110,20 L130,70 L150,10 L170,80 L190,45 L400,45"
            />
            <circle className="pulse-dot" r="4" />
          </svg>
        </div>
        </div>

        <div className="brand-bottom">SECURE SESSION · ENCRYPTED</div>
      </div>

      <div className="login-form-side">
        <form className="login-card" onSubmit={handleSubmit}>
          <h2 className="login-title">Sign in</h2>
          <p className="login-subtitle">Use your hospital staff credentials to continue.</p>

          {error && <div className="error-banner">{error}</div>}

          <div className="field">
            <label htmlFor="username">Email or username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="you@hospital.com"
              autoComplete="username"
              required
            />
          </div>

          <div className="field password-row">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="form-row">
            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
