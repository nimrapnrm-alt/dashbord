import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import {
  DollarSign, Users, ShoppingCart, TrendingUp,
  ArrowUpRight, ArrowDownRight, Clock, RefreshCw, Wifi
} from 'lucide-react'
import { recentActivity } from '../data/mockData'
import { useLiveData } from '../hooks/useLiveData'
import './Dashboard.css'

const BASE_STATS = [
  { label: 'Total Revenue', value: '$118,420', change: '+18.2%', up: true, icon: DollarSign, color: '#6366f1', bg: 'rgba(99,102,241,0.13)', sub: 'vs last month', accent: 'linear-gradient(90deg,#6366f1,#818cf8)' },
  { label: 'Active Users', value: '1,145', change: '+12.5%', up: true, icon: Users, color: '#14b8a6', bg: 'rgba(20,184,166,0.13)', sub: 'vs last month', accent: 'linear-gradient(90deg,#14b8a6,#34d399)' },
  { label: 'New Orders', value: '284', change: '+8.1%', up: true, icon: ShoppingCart, color: '#f59e0b', bg: 'rgba(245,158,11,0.13)', sub: 'vs last month', accent: 'linear-gradient(90deg,#f59e0b,#fbbf24)' },
  { label: 'Growth Rate', value: '24.8%', change: '-2.3%', up: false, icon: TrendingUp, color: '#ec4899', bg: 'rgba(236,72,153,0.13)', sub: 'vs last month', accent: 'linear-gradient(90deg,#ec4899,#f472b6)' },
]

const ACTIVITY_ICONS = {
  upgrade: { bg: 'rgba(99,102,241,0.12)', color: '#6366f1' },
  trial: { bg: 'rgba(20,184,166,0.12)', color: '#14b8a6' },
  renewal: { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b' },
  error: { bg: 'rgba(239,68,68,0.12)', color: '#ef4444' },
  refund: { bg: 'rgba(236,72,153,0.12)', color: '#ec4899' },
  cancel: { bg: 'rgba(107,114,128,0.12)', color: '#6b7280' },
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--bg-surface)', border: '1px solid var(--border)',
      borderRadius: 8, padding: '10px 14px', boxShadow: 'var(--shadow-md)', fontSize: 13,
    }}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 6, fontWeight: 600 }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <strong>${p.value.toLocaleString()}</strong>
        </p>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const { revenueData, weeklyUsers, perfMetrics, stats, updatedLabel, countdown, refreshing, refresh } = useLiveData(BASE_STATS)

  return (
    <div>
      {/* Page header + live status bar */}
      <div className="dashboard-header">
        <div>
          <h1 className="page-title" style={{ marginBottom: 0 }}>Dashboard</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>Welcome back! Here's what's happening today.</p>
        </div>
        <div className="live-bar">
          <div className="live-indicator">
            <span className="live-dot" />
            <span className="live-label">LIVE</span>
          </div>
          <div className="refresh-info">
            <span className="updated-label">Updated {updatedLabel}</span>
            <span className="countdown-label">· refresh in {countdown}s</span>
          </div>
          <button
            className={`btn btn-secondary refresh-btn ${refreshing ? 'spinning' : ''}`}
            onClick={refresh}
            disabled={refreshing}
            title="Refresh now"
          >
            <RefreshCw size={14} className={refreshing ? 'spin-icon' : ''} />
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stat-grid">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`stat-card ${refreshing ? 'refreshing' : ''}`}
            style={{ '--card-accent': BASE_STATS[i].accent }}
          >
            <div className="top">
              <span className="label">{s.label}</span>
              <div className="icon-box" style={{ background: BASE_STATS[i].bg }}>
                <s.icon size={18} color={BASE_STATS[i].color} />
              </div>
            </div>
            <div className="value">{s.value}</div>
            <div className="change" style={{ color: s.up ? 'var(--success)' : 'var(--danger)' }}>
              {s.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {s.change}
              <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: 2 }}>{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="card" style={{ padding: 20, marginBottom: 20 }}>
        <div className="section-header">
          <div>
            <div className="section-title">Revenue Overview</div>
            <div className="section-subtitle">Monthly revenue, expenses & profit</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {refreshing && <div className="chart-refreshing-badge"><Wifi size={12} /> Updating…</div>}
            <select className="input" style={{ width: 'auto', fontSize: 13, padding: '6px 32px 6px 10px' }}>
              <option>Last 12 months</option>
              <option>Last 6 months</option>
              <option>This year</option>
            </select>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="prof" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 13, paddingTop: 8 }} />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" fill="url(#rev)" strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ec4899" fill="url(#exp)" strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="profit" name="Profit" stroke="#14b8a6" fill="url(#prof)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid-2" style={{ marginBottom: 20 }}>
        {/* Weekly Users */}
        <div className="card" style={{ padding: 20 }}>
          <div className="section-header">
            <div>
              <div className="section-title">Weekly Users</div>
              <div className="section-subtitle">New vs returning</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyUsers} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="new" name="New" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="returning" name="Returning" fill="#14b8a6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Metrics */}
        <div className="card" style={{ padding: 20 }}>
          <div className="section-header">
            <div>
              <div className="section-title">System Performance</div>
              <div className="section-subtitle">Key infrastructure metrics</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 8 }}>
            {perfMetrics.map(m => {
              const pct = m.unit === '%'
                ? (m.label === 'Error Rate' ? (1 - m.value) * 100 : m.value)
                : Math.min(100, m.value <= m.target ? 100 : (m.target / m.value) * 100)
              const good = m.label === 'Error Rate' || m.label === 'API Latency'
                ? m.value < m.target
                : m.value >= m.target
              return (
                <div key={m.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{m.label}</span>
                    <span style={{ fontSize: 13, color: good ? 'var(--success)' : 'var(--warning)', fontWeight: 600, transition: 'color 0.3s' }}>
                      {m.value}{m.unit}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${Math.min(100, pct)}%`, background: good ? 'var(--success)' : 'var(--warning)' }} />
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>Target: {m.target}{m.unit}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card" style={{ padding: 20 }}>
        <div className="section-header">
          <div>
            <div className="section-title">Recent Activity</div>
            <div className="section-subtitle">Latest customer actions</div>
          </div>
          <button className="btn btn-secondary" style={{ fontSize: 13 }}>View all</button>
        </div>
        <div className="activity-list">
          {recentActivity.map(a => {
            const style = ACTIVITY_ICONS[a.type]
            return (
              <div key={a.id} className="activity-item">
                <div className="activity-dot" style={{ background: style.bg, color: style.color }}>
                  <Clock size={13} />
                </div>
                <div className="activity-body">
                  <span className="activity-user">{a.user}</span>
                  <span className="activity-action"> {a.action}</span>
                </div>
                <span className="activity-time">{a.time}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
