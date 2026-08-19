import React from 'react'
import { Briefcase, FileText, Users, CheckCircle } from 'lucide-react'

export default function DashboardSummaryCards({ summary = {} }) {
  const cards = [
    {
      title: 'Total Job Posts',
      value: summary.totalJobs || 0,
      icon: Briefcase,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      title: 'Total Applications',
      value: summary.totalApplications || 0,
      icon: FileText,
      color: 'bg-violet-50 text-violet-600 border-violet-100',
    },
    {
      title: 'Total Candidates',
      value: summary.totalApplicants || 0,
      icon: Users,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      title: 'Active Openings',
      value: summary.openPositions || 0,
      icon: CheckCircle,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => {
        const Icon = card.icon
        return (
          <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex items-center justify-between transition hover:shadow-md">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">{card.title}</p>
              <h3 className="mt-2 text-3xl font-extrabold text-slate-800">{card.value}</h3>
            </div>
            <div className={`p-4 rounded-xl ${card.color}`}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
