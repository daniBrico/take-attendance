import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

StudentSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

StudentSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

export default model('Student', StudentSchema)
