import { Schema, model } from 'mongoose'

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  professor: {
    type: Schema.Types.ObjectId,
    ref: 'Professor',
    required: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
})

export default model('Course', CourseSchema)
