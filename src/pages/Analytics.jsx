import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  FunnelChart, Funnel, LabelList,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { revenueData, trafficData, conversionFunnel, weeklyUsers } from '../data/mockData'
import { TrendingUp, Users, Globe, MousePointer } from 'lucide-react'

const ANALYTICS_STATS = [
  { label: 'Total Sessions', value: '84,291', change: '+14.3%', up: true, icon: Globe, color: '#6366f1', bg: 'rgba(99,102,241,0.12)' },
  { label: 'Unique Visitors', value: '62,480', change: '+9.7%', up: true, icon: Users, color: '#14b8a6', bg: 'rgba(20,184,166,0.12)' },
  { label: 'Bounce Rate', value: '32.4%', change: '-3.1%', up: true, icon: MousePointer, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  { label: 'Avg Session', value: '4m 12s', change: '+0:28', up: true, icon: TrendingUp, color: '#ec4899', bg: 'rgba(236,72,153,0.12)' },
]

function CustomPieLabel({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }) {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  if (percent < 0.07) return null
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
      {(percent * 100).toFixed(0)}%
    </text>
  )
}

export default function Analytics() {
  return (
    <div>
      <h1 className="page-title">Analytics</h1>
      <p className="page-subtitle">Deep dive into your traffic and conversion data.</p>

      <div className="stat-grid">
        {ANALYTICS_STATS.map(s => (
          <div key={s.label} className="stat-card">
            <div className="top">
              <span className="label">{s.label}</span>
              <div className="icon-box" style={{ background: s.bg }}>
                <s.icon size={18} color={s.color} />
              </div>
            </div>
            <div className="value">{s.value}</div>
            <div className="change" style={{ color: s.up ? 'var(--success)' : 'var(--danger)' }}>
              {s.change} vs last period
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Trend */}
      <div className="card" style={{ padding: 20, marginBottom: 20 }}>
        <div className="section-header">
          <div>
            <div className="section-title">Revenue Trend</div>
            <div className="section-subtitle">12-month revenue line chart</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}
              formatter={v => [`$${v.toLocaleString()}`, '']}
            />
            <Legend wrapperStyle={{ fontSize: 13 }} />
            <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: '#6366f1' }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="profit" name="Profit" stroke="#14b8a6" strokeWidth={2.5} dot={{ r: 4, fill: '#14b8a6' }} activeDot={{ r: 6 }} strokeDasharray="4 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid-2" style={{ marginBottom: 20 }}>
        {/* Traffic Sources */}
        <div className="card" style={{ padding: 20 }}>
          <div className="section-header">
            <div>
              <div className="section-title">Traffic Sources</div>
              <div className="section-subtitle">Where your visitors come from</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <ResponsiveContainer width="55%" height={220}>
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%" cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  dataKey="value"
                  labelLine={false}
                  label={<CustomPieLabel />}
                >
                  {trafficData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}
                  formatter={v => [v.toLocaleString(), 'sessions']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {trafficData.map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', flex: 1 }}>{d.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{d.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="card" style={{ padding: 20 }}>
          <div className="section-header">
            <div>
              <div className="section-title">Conversion Funnel</div>
              <div className="section-subtitle">Visitor to customer journey</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
            {conversionFunnel.map((stage, i) => {
              const pct = Math.round((stage.value / conversionFunnel[0].value) * 100)
              const colors = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff']
              return (
                <div key={stage.stage}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{stage.stage}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                      {stage.value.toLocaleString()} <span style={{ color: 'var(--text-muted)' }}>({pct}%)</span>
                    </span>
                  </div>
                  <div className="progress-bar" style={{ height: 8 }}>
                    <div className="progress-fill" style={{ width: `${pct}%`, background: colors[i] }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Weekly bar */}
      <div className="card" style={{ padding: 20 }}>
        <div className="section-header">
          <div>
            <div className="section-title">User Acquisition</div>
            <div className="section-subtitle">New vs returning users this week</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={weeklyUsers} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="new" name="New Users" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="returning" name="Returning" fill="#14b8a6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
