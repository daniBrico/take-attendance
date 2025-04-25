import { Schema, model } from 'mongoose'

const EmailValidateSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

export default model('EmailValidate', EmailValidateSchema)
