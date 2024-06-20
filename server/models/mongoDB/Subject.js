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
  dictado: {
    type: String,
    required: true,
  },
  correlativas: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
  ],
})

export default model('Subject', SubjectSchema)
