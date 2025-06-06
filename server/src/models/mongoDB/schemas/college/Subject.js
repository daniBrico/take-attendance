import { Schema, model } from 'mongoose'

const SubjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  offering: {
    type: String,
  },
  correlatives: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
})

export default model('Subject', SubjectSchema)
