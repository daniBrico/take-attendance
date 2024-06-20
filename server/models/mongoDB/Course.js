import { Schema, model } from 'mongoose'

const CourseSchema = new Schema({
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
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
