import { useState } from 'react'
import { Search, Download, RefreshCw, MoreHorizontal } from 'lucide-react'
import { orders } from '../data/mockData'

const STATUS_MAP = {
  Completed: 'badge-success',
  Pending: 'badge-warning',
  Failed: 'badge-danger',
  Refunded: 'badge-accent',
}

export default function Orders() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = orders.filter(o => {
    const q = search.toLowerCase()
    const matchSearch = o.id.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.product.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'All' || o.status === statusFilter
    return matchSearch && matchStatus
  })

  const totals = {
    all: orders.length,
    completed: orders.filter(o => o.status === 'Completed').length,
    pending: orders.filter(o => o.status === 'Pending').length,
    failed: orders.filter(o => o.status === 'Failed').length,
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: 0 }}>Orders</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>Manage all customer orders</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary"><RefreshCw size={15} /> Refresh</button>
          <button className="btn btn-secondary"><Download size={15} /> Export</button>
        </div>
      </div>

      {/* Tab filters */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 16, borderBottom: '1px solid var(--border)' }}>
        {[
          { label: `All (${totals.all})`, value: 'All' },
          { label: `Completed (${totals.completed})`, value: 'Completed' },
          { label: `Pending (${totals.pending})`, value: 'Pending' },
          { label: `Failed (${totals.failed})`, value: 'Failed' },
        ].map(tab => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            style={{
              padding: '10px 16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 500,
              color: statusFilter === tab.value ? 'var(--accent)' : 'var(--text-secondary)',
              borderBottom: statusFilter === tab.value ? '2px solid var(--accent)' : '2px solid transparent',
              marginBottom: -1,
              transition: 'color 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <div style={{ position: 'relative', maxWidth: 320 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            className="input"
            style={{ paddingLeft: 34 }}
            placeholder="Search orders..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Status</th>
              <th style={{ width: 50 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent)', fontSize: 13 }}>{o.id}</td>
                <td style={{ fontWeight: 500 }}>{o.customer}</td>
                <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{o.product}</td>
                <td style={{ fontWeight: 700 }}>{o.amount}</td>
                <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{o.date}</td>
                <td>
                  <span style={{
                    fontSize: 12,
                    padding: '2px 8px',
                    borderRadius: 4,
                    background: 'var(--bg-base)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                  }}>
                    {o.payment}
                  </span>
                </td>
                <td><span className={`badge ${STATUS_MAP[o.status]}`}>{o.status}</span></td>
                <td>
                  <button className="btn btn-ghost" style={{ padding: '4px 6px' }}>
                    <MoreHorizontal size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            No orders found.
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, fontSize: 13, color: 'var(--text-secondary)' }}>
        <span>Showing {filtered.length} of {orders.length} orders</span>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>Previous</button>
          <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 12 }}>Next</button>
        </div>
      </div>
    </div>
  )
}
