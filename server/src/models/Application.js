import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema(
  {
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jobPost: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPost', required: true },
    resumeUrl: { type: String },
    coverLetter: { type: String },
    status: {
      type: String,
      enum: ['pending', 'shortlisted', 'interview', 'hired', 'rejected'],
      default: 'pending',
    },
    adminNotes: { type: String },
    statusHistory: [
      {
        status: { type: String },
        changedAt: { type: Date },
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

applicationSchema.index({ applicant: 1, jobPost: 1 }, { unique: true })

// Ensure that every status change is automatically tracked in statusHistory
applicationSchema.pre('save', function () {
  if (this.isNew || this.isModified('status')) {
    const lastHistory = this.statusHistory[this.statusHistory.length - 1]
    if (!lastHistory || lastHistory.status !== this.status) {
      this.statusHistory.push({
        status: this.status,
        changedAt: new Date(),
        changedBy: this._changedBy || null,
      })
    }
  }
})

export default mongoose.model('Application', applicationSchema)
