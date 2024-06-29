import { Schema, model } from 'mongoose'

const CareerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Integer,
    required: true,
  },
  intermediateDegree: {
    type: String,
  },
  intermediateDegreeDuration: {
    type: String,
  },
  subjectsByYear: [
    {
      year: {
        type: String,
        required: true,
      },
      subjects: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
      },
    },
  ],
})

export default model('Career', CareerSchema)
