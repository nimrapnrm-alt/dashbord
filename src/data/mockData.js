export const revenueData = [
  { month: 'Jan', revenue: 42000, expenses: 28000, profit: 14000 },
  { month: 'Feb', revenue: 53000, expenses: 31000, profit: 22000 },
  { month: 'Mar', revenue: 48000, expenses: 29000, profit: 19000 },
  { month: 'Apr', revenue: 61000, expenses: 34000, profit: 27000 },
  { month: 'May', revenue: 55000, expenses: 32000, profit: 23000 },
  { month: 'Jun', revenue: 72000, expenses: 38000, profit: 34000 },
  { month: 'Jul', revenue: 68000, expenses: 36000, profit: 32000 },
  { month: 'Aug', revenue: 79000, expenses: 41000, profit: 38000 },
  { month: 'Sep', revenue: 85000, expenses: 44000, profit: 41000 },
  { month: 'Oct', revenue: 91000, expenses: 47000, profit: 44000 },
  { month: 'Nov', revenue: 103000, expenses: 52000, profit: 51000 },
  { month: 'Dec', revenue: 118000, expenses: 58000, profit: 60000 },
]

export const trafficData = [
  { name: 'Organic', value: 4200, color: '#6366f1' },
  { name: 'Direct', value: 2800, color: '#ec4899' },
  { name: 'Social', value: 1900, color: '#14b8a6' },
  { name: 'Referral', value: 1400, color: '#f59e0b' },
  { name: 'Email', value: 900, color: '#8b5cf6' },
]

export const weeklyUsers = [
  { day: 'Mon', new: 120, returning: 340 },
  { day: 'Tue', new: 180, returning: 290 },
  { day: 'Wed', new: 150, returning: 380 },
  { day: 'Thu', new: 210, returning: 420 },
  { day: 'Fri', new: 260, returning: 380 },
  { day: 'Sat', new: 190, returning: 250 },
  { day: 'Sun', new: 140, returning: 210 },
]

export const conversionFunnel = [
  { stage: 'Visitors', value: 10000 },
  { stage: 'Leads', value: 6800 },
  { stage: 'Qualified', value: 3200 },
  { stage: 'Proposals', value: 1800 },
  { stage: 'Customers', value: 940 },
]

export const customers = [
  { id: 1, name: 'Olivia Martin', email: 'olivia@techcorp.com', plan: 'Enterprise', spent: '$12,400', status: 'Active', joined: 'Jan 12, 2024', avatar: 'OM' },
  { id: 2, name: 'James Wilson', email: 'james@startup.io', plan: 'Pro', spent: '$4,200', status: 'Active', joined: 'Feb 8, 2024', avatar: 'JW' },
  { id: 3, name: 'Sofia Garcia', email: 'sofia@design.co', plan: 'Starter', spent: '$840', status: 'Active', joined: 'Mar 3, 2024', avatar: 'SG' },
  { id: 4, name: 'Liam Chen', email: 'liam@devshop.com', plan: 'Pro', spent: '$5,600', status: 'Inactive', joined: 'Nov 20, 2023', avatar: 'LC' },
  { id: 5, name: 'Emma Davis', email: 'emma@agency.net', plan: 'Enterprise', spent: '$18,900', status: 'Active', joined: 'Oct 5, 2023', avatar: 'ED' },
  { id: 6, name: 'Noah Kim', email: 'noah@ventures.vc', plan: 'Pro', spent: '$3,780', status: 'Active', joined: 'Apr 17, 2024', avatar: 'NK' },
  { id: 7, name: 'Ava Thompson', email: 'ava@media.fm', plan: 'Starter', spent: '$480', status: 'Trial', joined: 'May 30, 2024', avatar: 'AT' },
  { id: 8, name: 'Ethan Brown', email: 'ethan@cloud.dev', plan: 'Enterprise', spent: '$22,100', status: 'Active', joined: 'Sep 14, 2023', avatar: 'EB' },
  { id: 9, name: 'Isabella Lee', email: 'isabella@fintech.io', plan: 'Pro', spent: '$6,300', status: 'Active', joined: 'Dec 1, 2023', avatar: 'IL' },
  { id: 10, name: 'Mason White', email: 'mason@apps.co', plan: 'Starter', spent: '$720', status: 'Inactive', joined: 'Jun 22, 2024', avatar: 'MW' },
]

export const orders = [
  { id: '#ORD-8821', customer: 'Olivia Martin', product: 'Enterprise Plan', amount: '$2,400', date: 'Jun 5, 2026', status: 'Completed', payment: 'Stripe' },
  { id: '#ORD-8820', customer: 'Emma Davis', product: 'Enterprise Plan', amount: '$2,400', date: 'Jun 5, 2026', status: 'Completed', payment: 'Stripe' },
  { id: '#ORD-8819', customer: 'Noah Kim', product: 'Pro Plan', amount: '$79', date: 'Jun 4, 2026', status: 'Completed', payment: 'PayPal' },
  { id: '#ORD-8818', customer: 'Ava Thompson', product: 'Starter Plan', amount: '$19', date: 'Jun 4, 2026', status: 'Pending', payment: 'Stripe' },
  { id: '#ORD-8817', customer: 'James Wilson', product: 'Pro Plan', amount: '$79', date: 'Jun 3, 2026', status: 'Completed', payment: 'Stripe' },
  { id: '#ORD-8816', customer: 'Liam Chen', product: 'Pro Plan', amount: '$79', date: 'Jun 3, 2026', status: 'Failed', payment: 'Stripe' },
  { id: '#ORD-8815', customer: 'Ethan Brown', product: 'Enterprise Plan', amount: '$2,400', date: 'Jun 2, 2026', status: 'Completed', payment: 'Wire' },
  { id: '#ORD-8814', customer: 'Isabella Lee', product: 'Pro Plan', amount: '$79', date: 'Jun 2, 2026', status: 'Completed', payment: 'Stripe' },
  { id: '#ORD-8813', customer: 'Sofia Garcia', product: 'Starter Plan', amount: '$19', date: 'Jun 1, 2026', status: 'Refunded', payment: 'PayPal' },
  { id: '#ORD-8812', customer: 'Mason White', product: 'Starter Plan', amount: '$19', date: 'Jun 1, 2026', status: 'Pending', payment: 'Stripe' },
]

export const products = [
  { id: 1, name: 'Starter Plan', price: '$19/mo', mrr: '$8,550', users: 450, growth: 12, status: 'Active' },
  { id: 2, name: 'Pro Plan', price: '$79/mo', mrr: '$31,600', users: 400, growth: 24, status: 'Active' },
  { id: 3, name: 'Enterprise Plan', price: '$2,400/yr', mrr: '$84,000', users: 35, growth: 31, status: 'Active' },
  { id: 4, name: 'Add-on: Analytics', price: '$29/mo', mrr: '$4,350', users: 150, growth: 8, status: 'Active' },
  { id: 5, name: 'Add-on: API Access', price: '$49/mo', mrr: '$6,860', users: 140, growth: 18, status: 'Active' },
  { id: 6, name: 'Legacy Basic', price: '$9/mo', mrr: '$1,080', users: 120, growth: -5, status: 'Deprecated' },
]

export const recentActivity = [
  { id: 1, user: 'Olivia Martin', action: 'Upgraded to Enterprise', time: '2 min ago', type: 'upgrade' },
  { id: 2, user: 'Ava Thompson', action: 'Started free trial', time: '18 min ago', type: 'trial' },
  { id: 3, user: 'Noah Kim', action: 'Renewed Pro subscription', time: '1 hr ago', type: 'renewal' },
  { id: 4, user: 'Liam Chen', action: 'Payment failed', time: '2 hr ago', type: 'error' },
  { id: 5, user: 'Sofia Garcia', action: 'Requested refund', time: '3 hr ago', type: 'refund' },
  { id: 6, user: 'Mason White', action: 'Cancelled subscription', time: '5 hr ago', type: 'cancel' },
]

export const performanceMetrics = [
  { label: 'Page Load', value: 98, unit: '%', target: 95 },
  { label: 'Uptime', value: 99.97, unit: '%', target: 99.9 },
  { label: 'API Latency', value: 142, unit: 'ms', target: 200 },
  { label: 'Error Rate', value: 0.12, unit: '%', target: 1 },
]
