import { Schema, model } from 'mongoose'

const CareerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  intermediateDegree: {
    type: String,
  },
  intermediateDegreeDuration: {
    type: Number,
  },
  subjectsByYear: [
    {
      year: {
        type: String,
        required: true,
      },
      subjects: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Subject',
          required: true,
        },
      ],
    },
  ],
})

export default model('Career', CareerSchema)
