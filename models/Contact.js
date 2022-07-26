import mongoose from 'mongoose'
import validator from 'validator'

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  gmail: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid gmail account',
    },
  },
  telegram: {
    type: String,
  },
  relationship: {
    type: String,
    enum: ['unclassified', 'friends', 'work', 'school'],
    default: 'unclassified',
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
})

export default mongoose.model('Contact', ContactSchema)
