import { useState, useEffect, useCallback, useRef } from 'react'
import { revenueData as baseRevenue, weeklyUsers as baseWeekly, performanceMetrics as basePerfMetrics } from '../data/mockData'

const REFRESH_INTERVAL = 30

function jitter(value, pct = 0.04) {
  const delta = value * pct * (Math.random() * 2 - 1)
  return Math.round((value + delta) * 100) / 100
}

function jitterRevenue(data) {
  return data.map((row, i) => {
    if (i < data.length - 2) return row
    return {
      ...row,
      revenue: Math.round(jitter(row.revenue, 0.03)),
      expenses: Math.round(jitter(row.expenses, 0.03)),
      profit: Math.round(jitter(row.profit, 0.05)),
    }
  })
}

function jitterWeekly(data) {
  return data.map(row => ({
    ...row,
    new: Math.max(10, Math.round(jitter(row.new, 0.08))),
    returning: Math.max(10, Math.round(jitter(row.returning, 0.06))),
  }))
}

function jitterStats(stats) {
  const revenue = Math.round(jitter(118420, 0.02))
  const users = Math.round(jitter(1145, 0.015))
  const orders = Math.round(jitter(284, 0.03))
  const growth = Math.round(jitter(24.8, 0.04) * 10) / 10

  const revChange = ((revenue - 118420) / 118420 * 100)
  const usersChange = ((users - 1145) / 1145 * 100)

  return [
    { ...stats[0], value: `$${revenue.toLocaleString()}`, change: `${revChange >= 0 ? '+' : ''}${(18.2 + revChange * 0.1).toFixed(1)}%`, up: true },
    { ...stats[1], value: users.toLocaleString(), change: `${usersChange >= 0 ? '+' : ''}${(12.5 + usersChange * 0.1).toFixed(1)}%`, up: true },
    { ...stats[2], value: orders.toString(), change: `+${(8.1 + jitter(0, 0.5)).toFixed(1)}%`, up: true },
    { ...stats[3], value: `${growth}%`, change: `${growth >= 24.8 ? '+' : ''}${(growth - 24.8).toFixed(1)}%`, up: growth >= 24.8 },
  ]
}

function jitterPerf(data) {
  return data.map(m => ({
    ...m,
    value: m.label === 'API Latency'
      ? Math.round(jitter(m.value, 0.08))
      : Math.round(jitter(m.value, 0.001) * 100) / 100,
  }))
}

export function useLiveData(initialStats) {
  const [revenueData, setRevenueData] = useState(() => jitterRevenue(baseRevenue))
  const [weeklyUsers, setWeeklyUsers] = useState(() => jitterWeekly(baseWeekly))
  const [perfMetrics, setPerfMetrics] = useState(() => jitterPerf(basePerfMetrics))
  const [stats, setStats] = useState(() => jitterStats(initialStats))
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL)
  const [refreshing, setRefreshing] = useState(false)
  const [tick, setTick] = useState(0)

  const refresh = useCallback(async () => {
    setRefreshing(true)
    await new Promise(r => setTimeout(r, 600))
    setRevenueData(jitterRevenue(baseRevenue))
    setWeeklyUsers(jitterWeekly(baseWeekly))
    setPerfMetrics(jitterPerf(basePerfMetrics))
    setStats(s => jitterStats(s))
    setLastUpdated(new Date())
    setCountdown(REFRESH_INTERVAL)
    setRefreshing(false)
  }, [])

  // Auto-refresh timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          refresh()
          return REFRESH_INTERVAL
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [refresh])

  // Time-ago tick for display
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 10000)
    return () => clearInterval(t)
  }, [])

  const secondsAgo = Math.floor((Date.now() - lastUpdated) / 1000)
  const updatedLabel = secondsAgo < 10 ? 'just now' : `${secondsAgo}s ago`

  return { revenueData, weeklyUsers, perfMetrics, stats, lastUpdated, updatedLabel, countdown, refreshing, refresh }
}
