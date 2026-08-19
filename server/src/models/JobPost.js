import mongoose from 'mongoose'

const jobPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    department: { type: String },
    location: { type: String },
    employmentType: {
      type: String,
      enum: ['full-time', 'part-time', 'internship', 'contract'],
    },
    salary: {
      min: { type: Number },
      max: { type: Number },
    },
    skillsRequired: [{ type: String }],
    experienceLevel: { type: String },
    openings: { type: Number, default: 1 },
    deadline: { type: Date },
    status: {
      type: String,
      enum: ['open', 'closed', 'draft'],
      default: 'draft',
    },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export default mongoose.model('JobPost', jobPostSchema)
