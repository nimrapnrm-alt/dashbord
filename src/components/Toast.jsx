import { useEffect } from 'react'
import { useNotifications } from '../context/NotificationContext'
import { X } from 'lucide-react'
import './Toast.css'

const TYPE_COLOR = {
  payment: '#10b981',
  signup: '#6366f1',
  upgrade: '#6366f1',
  error: '#ef4444',
  alert: '#f59e0b',
  milestone: '#ec4899',
  cancel: '#6b7280',
}

function ToastItem({ toast }) {
  const { dismissToast } = useNotifications()

  useEffect(() => {
    const t = setTimeout(() => dismissToast(toast.toastId), 4500)
    return () => clearTimeout(t)
  }, [toast.toastId, dismissToast])

  return (
    <div className="toast-item" style={{ '--toast-color': TYPE_COLOR[toast.type] || '#6366f1' }}>
      <div className="toast-bar" />
      <div className="toast-icon">{toast.icon}</div>
      <div className="toast-body">
        <div className="toast-title">{toast.title}</div>
        <div className="toast-desc">{toast.body}</div>
      </div>
      <button className="toast-close" onClick={() => dismissToast(toast.toastId)}>
        <X size={13} />
      </button>
    </div>
  )
}

export default function ToastContainer() {
  const { toasts } = useNotifications()
  if (!toasts.length) return null

  return (
    <div className="toast-container">
      {toasts.map(t => <ToastItem key={t.toastId} toast={t} />)}
    </div>
  )
}
