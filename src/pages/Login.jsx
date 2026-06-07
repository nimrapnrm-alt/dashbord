import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Zap, Eye, EyeOff, Sun, Moon } from 'lucide-react'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('admin@saas.io')
  const [password, setPassword] = useState('password')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const result = login(email, password)
    if (result.ok) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="login-page">
      <button
        className="btn btn-ghost theme-toggle-login"
        onClick={toggle}
        title="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo">
            <Zap size={24} />
          </div>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to your NexusHQ dashboard</p>
        </div>

        <div className="demo-hint">
          <span>Demo: </span>
          <code>admin@saas.io</code> / <code>password</code>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-field">
            <label>Email address</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@company.com"
            />
          </div>

          <div className="form-field">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label>Password</label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>
            <div className="password-wrap">
              <input
                className="input"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                style={{ paddingRight: 40 }}
              />
              <button
                type="button"
                className="pass-toggle"
                onClick={() => setShowPass(s => !s)}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary login-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner" />
            ) : 'Sign In'}
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <a href="#">Start free trial</a>
        </p>
      </div>

      <div className="login-bg">
        <div className="bg-blob b1" />
        <div className="bg-blob b2" />
      </div>
    </div>
  )
}
