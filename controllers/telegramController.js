import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import axios from 'axios'
import Message from '../models/Message.js'
import moment from 'moment'
import Contact from '../models/Contact.js'
import { sentimentAnalysis } from '../server.js'

class TelegramAPI {
  accessToken = ''
  userId = ''
  constructor(accessToken, userId) {
    this.accessToken = accessToken
    this.userId = userId
  }
  fetchMessage = async () => {
    let result = []
    await axios
      .get('https://api.telegram.org/bot' + this.accessToken + '/getUpdates')
      .then(async (res) => {
        result = res.data.result
        console.log(result)
      })
      .catch(async (error) => {
        console.log(error)
      })
    result = await Promise.all(
      result.map(async (x) => {
        let content = {
          threadId: '',
          body: '',
          handle: '',
          name: '',
          date: '',
        }
        content.threadId = x.update_id
        if (x.message) {
          content.body = x.message.text
          content.date = x.message.date
          content.handle = x.message.from.username
          if (x.message.from.first_name && x.message.from.last_name) {
            content.name =
              x.message.from.first_name + ' ' + x.message.from.last_name
          }
          if (x.message.from.first_name && !x.message.from.last_name) {
            content.name = x.message.from.first_name
          }
          if (x.message.from.last_name && !x.message.from.first_name) {
            content.name = x.message.from.last_name
          }
          await Message.updateOne(
            { createdBy: this.userId, messageId: content.threadId },
            {
              createdBy: this.userId,
              messageSource: 'telegram',
              name: content.name,
              date: moment.unix(content.date).format(),
              body: content.body,
              handle: content.handle,
              link: 'https://t.me/' + content.handle,
              sentiment: await sentimentAnalysis(content.body),
            },
            { upsert: true }
          )
        }
        return content
      })
    )
    return result
  }
}
const getMessage = async (req, res) => {
  const { token } = req.body
  const userId = req.user.userId
  const telegram = new TelegramAPI(token, userId)
  const result = await telegram.fetchMessage()
  await Promise.all(
    result.map(async (x) => {
      await Contact.updateOne(
        {
          $or: [
            { name: { $regex: x.name, $options: 'i' } },
            { telegram: { $regex: x.handle, $options: 'i' } },
            { telegram: { $regex: x.name, $options: 'i' } },
            { gmail: { $regex: x.name, $options: 'i' } },
            { gmail: { $regex: x.handle, $options: 'i' } },
          ],
          createdBy: userId,
        },
        {
          name: x.name,
          telegram: x.handle,
          createdBy: userId,
        },
        { upsert: true }
      )
    })
  )
  res.status(StatusCodes.OK).json(result)
}

export { getMessage }
