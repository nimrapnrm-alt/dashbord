import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, BarChart3, Users, ShoppingCart,
  Package, Settings, LogOut, Zap, ChevronRight
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Sidebar.css'

const NAV = [
  { section: 'Overview' },
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { section: 'Management' },
  { to: '/customers', icon: Users, label: 'Customers' },
  { to: '/orders', icon: ShoppingCart, label: 'Orders' },
  { to: '/products', icon: Package, label: 'Products' },
  { section: 'System' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon"><Zap size={17} /></div>
          {!collapsed && <span className="logo-text">NexusHQ</span>}
        </div>
        <button className="collapse-btn btn btn-ghost" onClick={onToggle}>
          <ChevronRight size={15} className={collapsed ? '' : 'rotated'} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {NAV.map((item, i) => {
          if (item.section) {
            return <div key={i} className="nav-section-label">{item.section}</div>
          }
          const { to, icon: Icon, label } = item
          return (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Icon size={17} />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && (
          <div className="upgrade-card">
            <p className="upgrade-title">Upgrade to Enterprise</p>
            <p className="upgrade-desc">Unlock white-label & priority support</p>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 10, padding: '7px 12px', fontSize: 12.5 }}>
              View Plans
            </button>
          </div>
        )}
        <div className="user-row">
          <div className="avatar">{user?.avatar}</div>
          {!collapsed && (
            <div className="user-info">
              <div className="user-name">{user?.name}</div>
              <div className="user-role">{user?.role}</div>
            </div>
          )}
          <button className="btn btn-ghost logout-btn" onClick={handleLogout} title="Sign out">
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  )
}
