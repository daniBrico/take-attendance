import { Schema, model } from 'mongoose'

const SubjecsByYear = new Schema({
  year: {
    type: Integer,
    required: true,
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
})

export default model('SubjecsByYear', SubjecsByYear)
