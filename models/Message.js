import mongoose from 'mongoose'
import validator from 'validator'

const MessageSchema = new mongoose.Schema({
  messageSource: {
    type: String,
    enum: ['gmail', 'telegram'],
  },
  messageId: {
    type: String,
    required: [true, 'Please provide messageId'],
    unique: true,
  },
  name: {
    type: String,
  },
  date: {
    type: Date,
  },
  body: {
    type: String,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
  relationship: {
    type: String,
    enum: ['unclassified', 'friends', 'work', 'school'],
    default: 'unclassified',
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid gmail account',
    },
  },
  read: {
    type: Boolean,
    default: false,
  },
  handle: {
    type: String,
  },
  link: {
    type: String,
  },
  sentiment: {
    type: Number,
  },
})

export default mongoose.model('Message', MessageSchema)
