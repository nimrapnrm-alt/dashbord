import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { Save, Bell, Shield, CreditCard, Globe, Palette, User } from 'lucide-react'

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'integrations', label: 'Integrations', icon: Globe },
]

function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
        background: checked ? 'var(--accent)' : 'var(--border)',
        position: 'relative', transition: 'background 0.2s', flexShrink: 0,
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: '50%', background: 'white',
        position: 'absolute', top: 3,
        left: checked ? 23 : 3,
        transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
      }} />
    </div>
  )
}

function SettingRow({ label, description, children }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '16px 0', borderBottom: '1px solid var(--border)',
    }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{label}</div>
        {description && <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{description}</div>}
      </div>
      <div style={{ marginLeft: 16 }}>{children}</div>
    </div>
  )
}

export default function Settings() {
  const [tab, setTab] = useState('profile')
  const { theme, toggle } = useTheme()
  const { user } = useAuth()

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: 'NexusHQ Inc.',
    timezone: 'UTC-5 (EST)',
  })

  const [notifs, setNotifs] = useState({
    emailNewCustomer: true,
    emailPaymentFailed: true,
    emailWeeklyReport: false,
    pushAlerts: true,
    pushNewSignups: false,
    slackIntegration: true,
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const renderContent = () => {
    switch (tab) {
      case 'profile':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, padding: '20px 0', borderBottom: '1px solid var(--border)' }}>
              <div className="avatar" style={{ width: 64, height: 64, fontSize: 22 }}>{user?.avatar}</div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{user?.role}</div>
                <button className="btn btn-secondary" style={{ fontSize: 12, padding: '5px 12px', marginTop: 8 }}>
                  Change Avatar
                </button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {[
                { label: 'Full Name', key: 'name' },
                { label: 'Email Address', key: 'email', type: 'email' },
                { label: 'Company', key: 'company' },
                { label: 'Timezone', key: 'timezone' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 6 }}>
                    {f.label}
                  </label>
                  <input
                    className="input"
                    type={f.type || 'text'}
                    value={profile[f.key]}
                    onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
          </div>
        )

      case 'appearance':
        return (
          <div>
            <SettingRow label="Theme" description="Choose your preferred color scheme">
              <div style={{ display: 'flex', gap: 8 }}>
                {['dark', 'light'].map(t => (
                  <button
                    key={t}
                    onClick={() => theme !== t && toggle()}
                    style={{
                      padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
                      border: `2px solid ${theme === t ? 'var(--accent)' : 'var(--border)'}`,
                      background: theme === t ? 'var(--accent-light)' : 'var(--bg-surface)',
                      color: theme === t ? 'var(--accent)' : 'var(--text-secondary)',
                      fontWeight: 500, fontSize: 13, transition: 'all 0.15s',
                      textTransform: 'capitalize',
                    }}
                  >
                    {t === 'dark' ? '🌙 Dark' : '☀️ Light'}
                  </button>
                ))}
              </div>
            </SettingRow>
            <SettingRow label="Compact Mode" description="Reduce spacing for denser UI">
              <Toggle checked={false} onChange={() => {}} />
            </SettingRow>
            <SettingRow label="Animations" description="Enable UI transitions and animations">
              <Toggle checked={true} onChange={() => {}} />
            </SettingRow>
          </div>
        )

      case 'notifications':
        return (
          <div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Email Notifications</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Choose what emails you receive</div>
            </div>
            {[
              { key: 'emailNewCustomer', label: 'New customer signup', desc: 'Get notified when a new customer signs up' },
              { key: 'emailPaymentFailed', label: 'Payment failed', desc: 'Alert when a payment fails' },
              { key: 'emailWeeklyReport', label: 'Weekly summary report', desc: 'Receive weekly analytics digest' },
            ].map(n => (
              <SettingRow key={n.key} label={n.label} description={n.desc}>
                <Toggle checked={notifs[n.key]} onChange={v => setNotifs(p => ({ ...p, [n.key]: v }))} />
              </SettingRow>
            ))}
            <div style={{ marginTop: 20, marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Push Notifications</div>
            </div>
            {[
              { key: 'pushAlerts', label: 'Critical alerts', desc: 'System failures and urgent notifications' },
              { key: 'pushNewSignups', label: 'New signups', desc: 'Push alert on every new signup' },
            ].map(n => (
              <SettingRow key={n.key} label={n.label} description={n.desc}>
                <Toggle checked={notifs[n.key]} onChange={v => setNotifs(p => ({ ...p, [n.key]: v }))} />
              </SettingRow>
            ))}
          </div>
        )

      case 'security':
        return (
          <div>
            <SettingRow label="Two-Factor Authentication" description="Add an extra layer of security">
              <button className="btn btn-secondary" style={{ fontSize: 13 }}>Enable 2FA</button>
            </SettingRow>
            <SettingRow label="Active Sessions" description="2 active sessions">
              <button className="btn btn-danger" style={{ fontSize: 13 }}>Revoke All</button>
            </SettingRow>
            <SettingRow label="Password" description="Last changed 3 months ago">
              <button className="btn btn-secondary" style={{ fontSize: 13 }}>Change Password</button>
            </SettingRow>
            <SettingRow label="Login History" description="View recent account access">
              <button className="btn btn-secondary" style={{ fontSize: 13 }}>View History</button>
            </SettingRow>
          </div>
        )

      case 'billing':
        return (
          <div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(236,72,153,0.1))',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: 12, padding: 20, marginBottom: 20,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Enterprise Plan</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>$2,400/year · Renews Jan 12, 2027</div>
              </div>
              <button className="btn btn-primary">Manage Plan</button>
            </div>
            <SettingRow label="Payment Method" description="Visa ending in 4242">
              <button className="btn btn-secondary" style={{ fontSize: 13 }}>Update</button>
            </SettingRow>
            <SettingRow label="Billing Email" description={user?.email}>
              <button className="btn btn-secondary" style={{ fontSize: 13 }}>Change</button>
            </SettingRow>
            <SettingRow label="Invoices" description="Download past invoices">
              <button className="btn btn-secondary" style={{ fontSize: 13 }}>View All</button>
            </SettingRow>
          </div>
        )

      case 'integrations':
        return (
          <div>
            {[
              { name: 'Slack', desc: 'Real-time alerts in your workspace', connected: true, logo: '💬' },
              { name: 'Stripe', desc: 'Payment processing', connected: true, logo: '💳' },
              { name: 'HubSpot', desc: 'CRM sync', connected: false, logo: '🔶' },
              { name: 'Zapier', desc: 'Automate workflows', connected: false, logo: '⚡' },
              { name: 'GitHub', desc: 'Deploy tracking', connected: true, logo: '🐙' },
              { name: 'Intercom', desc: 'Customer support chat', connected: false, logo: '💬' },
            ].map(int => (
              <SettingRow key={int.name} label={`${int.logo} ${int.name}`} description={int.desc}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {int.connected && <span className="badge badge-success">Connected</span>}
                  <button className={`btn ${int.connected ? 'btn-secondary' : 'btn-primary'}`} style={{ fontSize: 13 }}>
                    {int.connected ? 'Configure' : 'Connect'}
                  </button>
                </div>
              </SettingRow>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div>
      <h1 className="page-title">Settings</h1>
      <p className="page-subtitle">Manage your account and preferences.</p>

      <div style={{ display: 'flex', gap: 24 }}>
        {/* Tab sidebar */}
        <div className="card" style={{ padding: 8, width: 200, flexShrink: 0, alignSelf: 'flex-start' }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                width: '100%', padding: '10px 12px', borderRadius: 8,
                background: tab === t.id ? 'var(--accent-light)' : 'transparent',
                color: tab === t.id ? 'var(--accent)' : 'var(--text-secondary)',
                border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.15s',
                textAlign: 'left',
              }}
            >
              <t.icon size={15} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="card" style={{ padding: 24, flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
              {TABS.find(t => t.id === tab)?.label}
            </div>
          </div>
          {renderContent()}
          {['profile', 'notifications'].includes(tab) && (
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className={`btn ${saved ? 'btn-secondary' : 'btn-primary'}`}
                onClick={handleSave}
              >
                <Save size={15} />
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
