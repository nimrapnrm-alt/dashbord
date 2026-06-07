import { useState } from 'react'
import { Plus, TrendingUp, TrendingDown, Package, MoreHorizontal } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { products } from '../data/mockData'

export default function Products() {
  const [view, setView] = useState('table')

  const totalMRR = products
    .filter(p => p.status === 'Active')
    .reduce((acc, p) => {
      const n = parseFloat(p.mrr.replace(/[$,]/g, ''))
      return acc + n
    }, 0)

  const chartData = products.map(p => ({
    name: p.name.replace('Plan', '').replace('Add-on: ', '').trim(),
    mrr: parseFloat(p.mrr.replace(/[$,]/g, '')),
    users: p.users,
  }))

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: 0 }}>Products</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>
            Total MRR: <strong style={{ color: 'var(--accent)' }}>${totalMRR.toLocaleString()}</strong>
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ display: 'flex', gap: 0, border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
            {['table', 'chart'].map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: '8px 14px',
                  fontSize: 13,
                  cursor: 'pointer',
                  border: 'none',
                  background: view === v ? 'var(--accent)' : 'var(--bg-surface)',
                  color: view === v ? 'white' : 'var(--text-secondary)',
                  fontWeight: 500,
                  textTransform: 'capitalize',
                  transition: 'all 0.15s',
                }}
              >
                {v}
              </button>
            ))}
          </div>
          <button className="btn btn-primary"><Plus size={15} /> New Plan</button>
        </div>
      </div>

      {view === 'table' ? (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Product / Plan</th>
                <th>Price</th>
                <th>MRR</th>
                <th>Active Users</th>
                <th>Growth</th>
                <th>Status</th>
                <th style={{ width: 50 }}></th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 8,
                        background: 'var(--accent-light)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Package size={16} color="var(--accent)" />
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{p.price}</td>
                  <td style={{ fontWeight: 700 }}>{p.mrr}</td>
                  <td>{p.users.toLocaleString()}</td>
                  <td>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600,
                      color: p.growth >= 0 ? 'var(--success)' : 'var(--danger)',
                    }}>
                      {p.growth >= 0
                        ? <TrendingUp size={14} />
                        : <TrendingDown size={14} />
                      }
                      {p.growth >= 0 ? '+' : ''}{p.growth}%
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${p.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-ghost" style={{ padding: '4px 6px' }}>
                      <MoreHorizontal size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid-2">
          <div className="card" style={{ padding: 20 }}>
            <div className="section-title" style={{ marginBottom: 16 }}>MRR by Plan</div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} width={70} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}
                  formatter={v => [`$${v.toLocaleString()}`, 'MRR']}
                />
                <Bar dataKey="mrr" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div className="section-title" style={{ marginBottom: 16 }}>Users by Plan</div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} width={70} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}
                />
                <Bar dataKey="users" fill="#14b8a6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}
