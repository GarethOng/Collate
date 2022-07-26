import { StatusCodes } from 'http-status-codes'
import axios from 'axios'
import Message from '../models/Message.js'
import checkPermissions from '../utils/checkPermissions.js'
import User from '../models/User.js'

const getMessage = async (req, res) => {
  const { keyword, contactSearch, relationship, sortOption } = req.body
  const queryObject = {
    createdBy: req.user.userId,
  }
  if (relationship !== 'unclassified') {
    queryObject.relationship = relationship
  }
  if (keyword) {
    queryObject.body = { $regex: keyword, $options: 'i' }
  }
  if (contactSearch) {
    queryObject.name = { $regex: contactSearch, $options: 'i' }
  }

  let message = Message.find(queryObject)

  if (sortOption === 'latest') {
    message = message.sort('-date')
  }

  if (sortOption === 'negative-positive') {
    message = message.sort({ sentiment: 1 })
  }

  const result = await message
  if (result.length !== 0) {
    checkPermissions(req.user, result[0].createdBy)
  }
  res.status(StatusCodes.OK).json({ result })
}

const markRead = async (req, res) => {
  const userId = req.user.userId
  const { messageId } = req.body
  console.log(messageId)
  await Message.updateOne(
    { createdBy: userId, messageId: messageId },
    { read: true }
  )
}
export { getMessage, markRead }
