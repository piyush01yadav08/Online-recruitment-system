import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const normalizePhone = (value) => value.replace(/[\s\-()]/g, '')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    phone: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ['applicant', 'admin'], default: 'applicant' },
  },
  { timestamps: true },
)

userSchema.pre('validate', function normalizeUserPhone(next) {
  if (this.phone) this.phone = normalizePhone(this.phone)
  next()
})

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.toSafeObject = function toSafeObject() {
  return { id: this._id, name: this.name, email: this.email, phone: this.phone, role: this.role }
}

export { normalizePhone }
export default mongoose.model('User', userSchema)
