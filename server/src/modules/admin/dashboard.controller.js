import JobPost from '../../models/JobPost.js'
import Application from '../../models/Application.js'
import User from '../../models/User.js'

export async function getDashboardSummary(request, response, next) {
  try {
    const [totalJobs, totalApplications, totalApplicants, openPositions, recentApplications, recentJobs] =
      await Promise.all([
        JobPost.countDocuments({ isDeleted: false }),
        Application.countDocuments(),
        User.countDocuments({ role: 'applicant' }),
        JobPost.countDocuments({ status: 'open', isDeleted: false }),
        Application.find()
          .populate('applicant', 'name email')
          .populate('jobPost', 'title')
          .sort({ createdAt: -1 })
          .limit(5),
        JobPost.find({ isDeleted: false }).sort({ createdAt: -1 }).limit(5),
      ])

    // Applications-per-job breakdown
    const jobs = await JobPost.find({ isDeleted: false }).select('title department')
    const counts = await Application.aggregate([
      { $match: { jobPost: { $in: jobs.map((j) => j._id) } } },
      { $group: { _id: '$jobPost', count: { $sum: 1 } } },
    ])
    const countMap = counts.reduce((acc, curr) => {
      acc[curr._id.toString()] = curr.count
      return acc
    }, {})
    const applicationsPerJob = jobs.map((j) => ({
      jobId: j._id,
      title: j.title,
      department: j.department,
      count: countMap[j._id.toString()] || 0,
    }))

    // Application status breakdown
    const statusCounts = await Application.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])
    const statuses = ['pending', 'shortlisted', 'interview', 'hired', 'rejected']
    const statusMap = statusCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count
      return acc
    }, {})
    const statusBreakdown = statuses.map((s) => ({
      status: s,
      count: statusMap[s] || 0,
    }))

    return response.json({
      summary: {
        totalJobs,
        totalApplications,
        totalApplicants,
        openPositions,
      },
      applicationsPerJob,
      statusBreakdown,
      recentApplications,
      recentJobs,
    })
  } catch (error) {
    next(error)
  }
}
