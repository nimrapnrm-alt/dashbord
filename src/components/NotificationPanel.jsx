import { useRef, useEffect } from 'react'
import { Bell, Check, Trash2, X } from 'lucide-react'
import { useNotifications } from '../context/NotificationContext'
import './NotificationPanel.css'

const TYPE_COLOR = {
  payment: 'var(--success)',
  signup: 'var(--accent)',
  upgrade: 'var(--accent)',
  error: 'var(--danger)',
  alert: 'var(--warning)',
  milestone: '#ec4899',
  cancel: 'var(--text-muted)',
}

const TYPE_BG = {
  payment: 'var(--success-light)',
  signup: 'var(--accent-light)',
  upgrade: 'var(--accent-light)',
  error: 'var(--danger-light)',
  alert: 'var(--warning-light)',
  milestone: 'rgba(236,72,153,0.12)',
  cancel: 'rgba(107,114,128,0.12)',
}

function timeAgo(date) {
  const secs = Math.floor((Date.now() - new Date(date)) / 1000)
  if (secs < 60) return `${secs}s ago`
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`
  return `${Math.floor(secs / 86400)}d ago`
}

export default function NotificationPanel({ open, onClose }) {
  const { notifications, unreadCount, markRead, markAllRead, clearAll } = useNotifications()
  const ref = useRef()

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="notif-panel" ref={ref}>
      <div className="notif-header">
        <div>
          <div className="notif-title">Notifications</div>
          {unreadCount > 0 && (
            <div className="notif-subtitle">{unreadCount} unread</div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {unreadCount > 0 && (
            <button className="btn btn-ghost" style={{ fontSize: 12, padding: '4px 8px' }} onClick={markAllRead} title="Mark all read">
              <Check size={13} /> All read
            </button>
          )}
          {notifications.length > 0 && (
            <button className="btn btn-ghost" style={{ fontSize: 12, padding: '4px 8px' }} onClick={clearAll} title="Clear all">
              <Trash2 size={13} />
            </button>
          )}
          <button className="btn btn-ghost" style={{ padding: '4px 6px' }} onClick={onClose}>
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="notif-list">
        {notifications.length === 0 ? (
          <div className="notif-empty">
            <Bell size={28} style={{ color: 'var(--text-muted)', marginBottom: 8 }} />
            <div>All caught up!</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>No notifications yet</div>
          </div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              className={`notif-item ${n.read ? '' : 'unread'}`}
              onClick={() => markRead(n.id)}
            >
              <div
                className="notif-icon"
                style={{ background: TYPE_BG[n.type], color: TYPE_COLOR[n.type] }}
              >
                {n.icon}
              </div>
              <div className="notif-body">
                <div className="notif-item-title">{n.title}</div>
                <div className="notif-item-desc">{n.body}</div>
                <div className="notif-item-time">{timeAgo(n.time)}</div>
              </div>
              {!n.read && <div className="unread-dot" />}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
