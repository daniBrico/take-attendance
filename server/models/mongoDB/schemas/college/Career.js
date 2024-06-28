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
      type: Schema.Types.ObjectId,
      ref: 'SubjecsByYear',
    },
  ],
})

export default model('Career', CareerSchema)
