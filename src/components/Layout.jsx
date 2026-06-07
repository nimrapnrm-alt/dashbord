import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="app-layout">
      {mobileSidebarOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 40, display: 'none'
          }}
          onClick={() => setMobileSidebarOpen(false)}
          className="mobile-overlay"
        />
      )}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
      />
      <div className="main-content">
        <Header onMenuToggle={() => setCollapsed(c => !c)} />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
