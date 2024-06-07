import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const TeacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

TeacherSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

TeacherSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

export const teacherModel = model('Teacher', TeacherSchema)
