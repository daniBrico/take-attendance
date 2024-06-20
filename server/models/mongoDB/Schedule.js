import { Schema, model } from 'mongoose'

const ScheduleSchema = new Schema({
  days: {
    type: [String],
    enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
})

export default model('Schedule', ScheduleSchema)
