import JobPost from '../../models/JobPost.js'
import Application from '../../models/Application.js'

export async function createJobPost(request, response, next) {
  try {
    const jobPost = new JobPost({
      ...request.body,
      postedBy: request.user._id,
    })
    await jobPost.save()
    return response.status(201).json(jobPost)
  } catch (error) {
    next(error)
  }
}

export async function getJobPosts(request, response, next) {
  try {
    const { status, department, location, search, page = 1, limit = 10 } = request.query
    const query = { isDeleted: false }

    if (status) query.status = status
    if (department) query.department = new RegExp(department, 'i')
    if (location) query.location = new RegExp(location, 'i')
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { skillsRequired: new RegExp(search, 'i') },
      ]
    }

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    const total = await JobPost.countDocuments(query)
    const jobs = await JobPost.find(query)
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)

    return response.json({
      jobs,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function getJobPostById(request, response, next) {
  try {
    const { id } = request.params
    const jobPost = await JobPost.findOne({ _id: id, isDeleted: false }).populate('postedBy', 'name email')

    if (!jobPost) {
      return response.status(404).json({ message: 'Job post not found' })
    }

    const applicationCount = await Application.countDocuments({ jobPost: id })

    return response.json({
      jobPost,
      applicationCount,
    })
  } catch (error) {
    next(error)
  }
}

export async function updateJobPost(request, response, next) {
  try {
    const { id } = request.params
    const jobPost = await JobPost.findOneAndUpdate(
      { _id: id, isDeleted: false },
      request.body,
      { new: true, runValidators: true },
    )

    if (!jobPost) {
      return response.status(404).json({ message: 'Job post not found' })
    }

    return response.json(jobPost)
  } catch (error) {
    next(error)
  }
}

export async function deleteJobPost(request, response, next) {
  try {
    const { id } = request.params
    const jobPost = await JobPost.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true },
    )

    if (!jobPost) {
      return response.status(404).json({ message: 'Job post not found' })
    }

    return response.json({ message: 'Job post deleted successfully' })
  } catch (error) {
    next(error)
  }
}
