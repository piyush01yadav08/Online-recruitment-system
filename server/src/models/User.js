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
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

userSchema.pre('validate', function normalizeUserPhone() {
  if (this.phone) this.phone = normalizePhone(this.phone)
})

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.toSafeObject = function toSafeObject() {
  return { id: this._id, name: this.name, email: this.email, phone: this.phone, role: this.role, isActive: this.isActive }
}

export { normalizePhone }
export default mongoose.model('User', userSchema)
