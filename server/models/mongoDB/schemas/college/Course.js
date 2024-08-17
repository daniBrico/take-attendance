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
  code: {
    type: String,
    unique: true,
  },
  enrollmentsRequests: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
      },
      comment: {
        type: String,
      },
      state: {
        type: String,
        enum: ['pendiente', 'aprobada', 'rechazada'],
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  // schedule: [
  //   {
  //     days: {
  //       type: [String],
  //       enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  //       required: true,
  //     },
  //     startTime: {
  //       type: String,
  //       required: true,
  //     },
  //     endTime: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
})

export default model('Course', CourseSchema)
