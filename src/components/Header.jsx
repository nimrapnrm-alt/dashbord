import { useState, useRef } from 'react'
import { Bell, Search, Sun, Moon, Menu } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useNotifications } from '../context/NotificationContext'
import NotificationPanel from './NotificationPanel'
import './Header.css'

export default function Header({ onMenuToggle }) {
  const { theme, toggle } = useTheme()
  const { user } = useAuth()
  const { unreadCount } = useNotifications()
  const [panelOpen, setPanelOpen] = useState(false)
  const bellRef = useRef()

  return (
    <header className="header">
      <div className="header-left">
        <button className="btn btn-ghost menu-btn" onClick={onMenuToggle}>
          <Menu size={20} />
        </button>
        <div className="search-box">
          <Search size={15} className="search-icon" />
          <input className="search-input" placeholder="Search anything..." />
          <span className="search-kbd">⌘K</span>
        </div>
      </div>
      <div className="header-right">
        <button className="btn btn-ghost icon-btn" onClick={toggle} title="Toggle theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div style={{ position: 'relative' }} ref={bellRef}>
          <button
            className={`btn btn-ghost icon-btn notif-btn ${panelOpen ? 'active' : ''}`}
            title="Notifications"
            onClick={() => setPanelOpen(o => !o)}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="notif-badge">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          <NotificationPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
        </div>

        <div className="header-divider" />
        <div className="header-user">
          <div className="avatar">{user?.avatar}</div>
          <div className="header-user-info">
            <span className="header-user-name">{user?.name}</span>
            <span className="header-user-email">{user?.email}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
