import { Router } from 'express'
import { authenticate } from '../../middleware/authenticate.js'
import { isAdmin } from './isAdmin.middleware.js'
import {
  createJobPost,
  getJobPosts,
  getJobPostById,
  updateJobPost,
  deleteJobPost,
} from './jobPost.controller.js'
import {
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  updateApplicationNotes,
} from './application.controller.js'
import {
  getApplicants,
  getApplicantById,
  toggleApplicantStatus,
} from './applicant.controller.js'
import { getDashboardSummary } from './dashboard.controller.js'

const router = Router()

// Protect all admin endpoints with authentication and role-based checks
router.use(authenticate, isAdmin)

// Dashboard endpoint
router.get('/dashboard', getDashboardSummary)

// Job Post endpoints
router.post('/jobs', createJobPost)
router.get('/jobs', getJobPosts)
router.get('/jobs/:id', getJobPostById)
router.put('/jobs/:id', updateJobPost)
router.delete('/jobs/:id', deleteJobPost)

// Application endpoints
router.get('/applications', getApplications)
router.get('/applications/:id', getApplicationById)
router.put('/applications/:id/status', updateApplicationStatus)
router.put('/applications/:id/notes', updateApplicationNotes)

// Applicant endpoints
router.get('/applicants', getApplicants)
router.get('/applicants/:id', getApplicantById)
router.put('/applicants/:id/toggle-status', toggleApplicantStatus)

export default router
