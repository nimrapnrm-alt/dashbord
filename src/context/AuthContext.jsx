import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

const DEMO_USER = {
  id: 1,
  name: 'Alex Johnson',
  email: 'admin@saas.io',
  role: 'Super Admin',
  avatar: 'AJ',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  })

  const login = (email, password) => {
    if (email === 'admin@saas.io' && password === 'password') {
      setUser(DEMO_USER)
      localStorage.setItem('user', JSON.stringify(DEMO_USER))
      return { ok: true }
    }
    return { ok: false, error: 'Invalid credentials. Use admin@saas.io / password' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
