import { useState } from 'react'
import { Search, Filter, Download, Plus, MoreHorizontal, Mail, Trash2 } from 'lucide-react'
import { customers } from '../data/mockData'

const STATUS_CLASS = {
  Active: 'badge-success',
  Inactive: 'badge-danger',
  Trial: 'badge-warning',
}

const PLAN_CLASS = {
  Enterprise: 'badge-accent',
  Pro: 'badge-success',
  Starter: 'badge-warning',
}

export default function Customers() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [planFilter, setPlanFilter] = useState('All')
  const [selected, setSelected] = useState(new Set())

  const filtered = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || c.status === statusFilter
    const matchPlan = planFilter === 'All' || c.plan === planFilter
    return matchSearch && matchStatus && matchPlan
  })

  const toggleSelect = (id) => {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
  }

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set())
    else setSelected(new Set(filtered.map(c => c.id)))
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: 0 }}>Customers</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>{customers.length} total customers</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary"><Download size={15} /> Export</button>
          <button className="btn btn-primary"><Plus size={15} /> Add Customer</button>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              className="input"
              style={{ paddingLeft: 34 }}
              placeholder="Search customers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="input" style={{ width: 'auto', padding: '10px 36px 10px 12px' }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Trial</option>
          </select>
          <select className="input" style={{ width: 'auto', padding: '10px 36px 10px 12px' }} value={planFilter} onChange={e => setPlanFilter(e.target.value)}>
            <option>All</option>
            <option>Enterprise</option>
            <option>Pro</option>
            <option>Starter</option>
          </select>
          {selected.size > 0 && (
            <button className="btn btn-danger">
              <Trash2 size={15} /> Delete ({selected.size})
            </button>
          )}
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th style={{ width: 40 }}>
                <input
                  type="checkbox"
                  checked={selected.size === filtered.length && filtered.length > 0}
                  onChange={toggleAll}
                  style={{ cursor: 'pointer', accentColor: 'var(--accent)' }}
                />
              </th>
              <th>Customer</th>
              <th>Plan</th>
              <th>Total Spent</th>
              <th>Status</th>
              <th>Joined</th>
              <th style={{ width: 80 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.has(c.id)}
                    onChange={() => toggleSelect(c.id)}
                    style={{ cursor: 'pointer', accentColor: 'var(--accent)' }}
                  />
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="avatar">{c.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{c.email}</div>
                    </div>
                  </div>
                </td>
                <td><span className={`badge ${PLAN_CLASS[c.plan]}`}>{c.plan}</span></td>
                <td style={{ fontWeight: 600 }}>{c.spent}</td>
                <td><span className={`badge ${STATUS_CLASS[c.status]}`}>{c.status}</span></td>
                <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{c.joined}</td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-ghost" style={{ padding: '4px 6px' }} title="Email">
                      <Mail size={14} />
                    </button>
                    <button className="btn btn-ghost" style={{ padding: '4px 6px' }} title="More">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            No customers match your filters.
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, fontSize: 13, color: 'var(--text-secondary)' }}>
        <span>Showing {filtered.length} of {customers.length} customers</span>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>Previous</button>
          <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 12 }}>Next</button>
        </div>
      </div>
    </div>
  )
}
