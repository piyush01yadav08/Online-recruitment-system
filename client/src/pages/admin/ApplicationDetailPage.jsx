import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { adminApi } from '../../features/admin/api/adminApi'
import ApplicationDetailPanel from '../../features/admin/ApplicationDetailPanel'
import { ArrowLeft } from 'lucide-react'

export default function ApplicationDetailPage() {
  const { id } = useParams()
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [isUpdatingNotes, setIsUpdatingNotes] = useState(false)

  const fetchApplicationDetails = () => {
    adminApi
      .getApplicationById(id)
      .then((res) => {
        setApplication(res)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load application details')
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchApplicationDetails()
  }, [id])

  const handleUpdateStatus = (newStatus) => {
    setIsUpdatingStatus(true)
    adminApi
      .updateApplicationStatus(id, newStatus)
      .then((updatedApp) => {
        setApplication(updatedApp)
        setIsUpdatingStatus(false)
      })
      .catch((err) => {
        alert(err.message || 'Failed to update application status')
        setIsUpdatingStatus(false)
      })
  }

  const handleUpdateNotes = (newNotes) => {
    setIsUpdatingNotes(true)
    adminApi
      .updateApplicationNotes(id, newNotes)
      .then((updatedApp) => {
        setApplication(updatedApp)
        setIsUpdatingNotes(false)
      })
      .catch((err) => {
        alert(err.message || 'Failed to save admin notes')
        setIsUpdatingNotes(false)
      })
  }

  if (loading) {
    return <div className="text-center py-12 text-slate-500 font-medium">Loading application details...</div>
  }

  if (error) {
    return <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/applications"
          className="p-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-slate-600 transition"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Application Review</h1>
          <p className="text-slate-400 text-sm mt-0.5">Manage recruitment status and read candidate profile.</p>
        </div>
      </div>

      <ApplicationDetailPanel
        application={application}
        onUpdateStatus={handleUpdateStatus}
        onUpdateNotes={handleUpdateNotes}
        isUpdatingStatus={isUpdatingStatus}
        isUpdatingNotes={isUpdatingNotes}
      />
    </div>
  )
}
