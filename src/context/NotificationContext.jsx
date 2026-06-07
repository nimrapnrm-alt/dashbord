import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

const NotificationContext = createContext()

const NOTIFICATION_POOL = [
  { type: 'payment', title: 'Payment received', body: 'Emma Davis paid $2,400 for Enterprise Plan', icon: '💳' },
  { type: 'signup', title: 'New customer signed up', body: 'Ryan Mitchell started a free trial', icon: '🎉' },
  { type: 'upgrade', title: 'Plan upgrade', body: 'Noah Kim upgraded from Pro to Enterprise', icon: '⬆️' },
  { type: 'error', title: 'Payment failed', body: 'Liam Chen\'s card was declined — action required', icon: '⚠️' },
  { type: 'milestone', title: 'Milestone reached', body: 'You\'ve hit 1,000 active subscribers!', icon: '🏆' },
  { type: 'signup', title: 'New customer signed up', body: 'Priya Sharma started a Pro subscription', icon: '🎉' },
  { type: 'alert', title: 'API latency spike', body: 'Average response time exceeded 300ms threshold', icon: '🔴' },
  { type: 'payment', title: 'Payment received', body: 'James Wilson renewed Pro Plan — $79', icon: '💳' },
  { type: 'cancel', title: 'Subscription cancelled', body: 'Mason White cancelled their Starter plan', icon: '❌' },
  { type: 'upgrade', title: 'Plan upgrade', body: 'Sofia Garcia upgraded from Starter to Pro', icon: '⬆️' },
  { type: 'alert', title: 'High traffic detected', body: 'Unusual traffic spike — 3.2x normal load', icon: '📈' },
  { type: 'milestone', title: 'Revenue milestone', body: 'Monthly revenue crossed $100k for the first time!', icon: '🏆' },
]

let _idCounter = 100

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'payment', title: 'Payment received', body: 'Ethan Brown paid $2,400 for Enterprise Plan', icon: '💳', time: new Date(Date.now() - 2 * 60000), read: false },
    { id: 2, type: 'signup', title: 'New customer signed up', body: 'Ava Thompson started a free trial', icon: '🎉', time: new Date(Date.now() - 18 * 60000), read: false },
    { id: 3, type: 'alert', title: 'API latency spike', body: 'Average response time exceeded 300ms threshold', icon: '🔴', time: new Date(Date.now() - 45 * 60000), read: true },
    { id: 4, type: 'milestone', title: 'Milestone reached', body: 'Monthly revenue crossed $100k for the first time!', icon: '🏆', time: new Date(Date.now() - 2 * 3600000), read: true },
  ])

  const [toasts, setToasts] = useState([])
  const poolIndexRef = useRef(0)

  const addNotification = useCallback((notif) => {
    const full = { ...notif, id: ++_idCounter, time: new Date(), read: false }
    setNotifications(prev => [full, ...prev].slice(0, 50))
    setToasts(prev => [...prev, { ...full, toastId: full.id }])
  }, [])

  const dismissToast = useCallback((toastId) => {
    setToasts(prev => prev.filter(t => t.toastId !== toastId))
  }, [])

  const markRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  // Simulate incoming real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const notif = NOTIFICATION_POOL[poolIndexRef.current % NOTIFICATION_POOL.length]
      poolIndexRef.current++
      addNotification(notif)
    }, 15000)
    return () => clearInterval(interval)
  }, [addNotification])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <NotificationContext.Provider value={{
      notifications, toasts, unreadCount,
      addNotification, dismissToast, markRead, markAllRead, clearAll,
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationContext)
