import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const ProfessorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
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

ProfessorSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

ProfessorSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

export default model('Professor', ProfessorSchema)
