import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const COLORS = {
  pending: '#eab308',      // yellow-500
  shortlisted: '#3b82f6',  // blue-500
  interview: '#a855f7',    // purple-500
  hired: '#10b981',        // emerald-500
  rejected: '#ef4444',     // red-500
}

export default function DashboardCharts({ applicationsPerJob = [], statusBreakdown = [] }) {
  const barData = applicationsPerJob.map((item) => ({
    name: item.title.length > 20 ? `${item.title.slice(0, 18)}...` : item.title,
    Applications: item.count,
  }))

  const pieData = statusBreakdown
    .filter((item) => item.count > 0)
    .map((item) => ({
      name: item.status.charAt(0).toUpperCase() + item.status.slice(1),
      value: item.count,
      color: COLORS[item.status] || '#cbd5e1',
    }))

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Applications per Job Chart */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Applications by Job Post</h3>
        <div className="h-80 w-full">
          {barData.length === 0 ? (
            <div className="flex h-full items-center justify-center text-slate-400">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '13px',
                  }}
                />
                <Bar dataKey="Applications" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Status Breakdown Chart */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Application Status Breakdown</h3>
        <div className="grid sm:grid-cols-[1fr_auto] items-center gap-6">
          <div className="h-80 w-full flex items-center justify-center">
            {pieData.length === 0 ? (
              <div className="text-slate-400">No applications submitted yet</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '13px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="flex flex-col gap-3 justify-center">
            {statusBreakdown.map((item) => {
              const color = COLORS[item.status]
              return (
                <div key={item.status} className="flex items-center gap-3 text-sm">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                  <span className="font-medium text-slate-600 capitalize w-24">{item.status}</span>
                  <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-xs">
                    {item.count}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
