import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { adminApi } from '../../features/admin/api/adminApi'
import JobPostForm from '../../features/admin/JobPostForm'
import { ArrowLeft } from 'lucide-react'

export default function JobPostFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      setLoading(true)
      adminApi
        .getJobPostById(id)
        .then((res) => {
          setJob(res.jobPost)
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message || 'Failed to load job post details')
          setLoading(false)
        })
    }
  }, [id])

  const handleSubmit = (data) => {
    setIsSubmitting(true)
    setError('')

    const action = id
      ? adminApi.updateJobPost(id, data)
      : adminApi.createJobPost(data)

    action
      .then(() => {
        setIsSubmitting(false)
        navigate('/admin/jobs')
      })
      .catch((err) => {
        setError(err.message || 'Failed to save job post')
        setIsSubmitting(false)
      })
  }

  if (loading) {
    return <div className="text-center py-12 text-slate-500 font-medium">Loading job post form...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/jobs"
          className="p-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-slate-600 transition"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            {id ? 'Edit Job Post' : 'Create Job Post'}
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {id ? 'Modify the details of your job opening.' : 'Publish a new job vacancy listing.'}
          </p>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>}

      <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm">
        <JobPostForm initialData={job} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  )
}
