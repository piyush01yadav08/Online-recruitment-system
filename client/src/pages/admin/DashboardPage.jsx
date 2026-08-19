import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminApi } from '../../features/admin/api/adminApi'
import DashboardSummaryCards from '../../features/admin/DashboardSummaryCards'
import DashboardCharts from '../../features/admin/DashboardCharts'
import { Briefcase, FileText, ArrowRight } from 'lucide-react'

export default function DashboardPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    adminApi
      .getDashboardSummary()
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load dashboard metrics')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="text-center py-12 text-slate-500 font-medium">Loading dashboard summary...</div>
  }

  if (error) {
    return <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Recruitment Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Real-time statistics, job tracking, and applicant operations.</p>
      </div>

      {/* KPI Cards */}
      <DashboardSummaryCards summary={data.summary} />

      {/* Charts */}
      <DashboardCharts
        applicationsPerJob={data.applicationsPerJob}
        statusBreakdown={data.statusBreakdown}
      />

      {/* Recent Items Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Job Posts */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Briefcase className="h-4.5 w-4.5 text-indigo-500" /> Recent Job Posts
            </h3>
            <Link
              to="/admin/jobs"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grow space-y-3.5">
            {data.recentJobs.length === 0 ? (
              <p className="text-sm text-slate-400 italic py-6 text-center">No job posts created yet.</p>
            ) : (
              data.recentJobs.map((job) => (
                <div key={job._id} className="flex items-start justify-between text-sm">
                  <div>
                    <h4 className="font-semibold text-slate-800">{job.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{job.department || 'General'} • {job.location || 'Remote'}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded capitalize">
                    {job.employmentType}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <FileText className="h-4.5 w-4.5 text-indigo-500" /> Recent Applications
            </h3>
            <Link
              to="/admin/applications"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grow space-y-3.5">
            {data.recentApplications.length === 0 ? (
              <p className="text-sm text-slate-400 italic py-6 text-center">No applications submitted yet.</p>
            ) : (
              data.recentApplications.map((app) => (
                <div key={app._id} className="flex items-start justify-between text-sm">
                  <div>
                    <h4 className="font-semibold text-slate-800">{app.applicant?.name || 'Candidate'}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Applied to: <span className="font-medium text-slate-500">{app.jobPost?.title || 'Job'}</span></p>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded capitalize">
                    {app.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
