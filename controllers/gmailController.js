import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import axios from 'axios'
import moment from 'moment'
import Message from '../models/Message.js'
import Contact from '../models/Contact.js'
import { sentimentAnalysis } from '../server.js'

class GmailAPI {
  accessToken = ''
  userId = ''
  constructor(accessToken, userId) {
    this.accessToken = accessToken
    this.userId = userId
  }

  searchGmail = async () => {
    var config = {
      method: 'get',
      url: 'https://www.googleapis.com/gmail/v1/users/me/messages?q=',
      headers: {
        Authorization: `Bearer ${this.accessToken} `,
      },
    }

    const threadId = []

    await axios(config)
      .then(async function (response) {
        const resultSize = response.data.resultSizeEstimate
        for (let i = 0; i < resultSize; i++) {
          threadId[i] = await response.data['messages'][i].id
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    return threadId
  }

  readGmailContent = async (messageId) => {
    var config = {
      method: 'get',
      url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    }

    var data = {}

    await axios(config)
      .then(async function (response) {
        data = await response.data
      })
      .catch(function (error) {
        console.log(error)
      })

    return data
  }

  readInboxContent = async (gmail) => {
    var threadId = await this.searchGmail()

    threadId = await Promise.all(
      threadId.map(async (x) => {
        return this.readGmailContent(x)
      })
    )
    threadId = await Promise.all(
      threadId.map(async (x) => {
        let content = {
          threadId: '',
          body: '',
          email: '',
          name: '',
          date: '',
          link: '',
        }
        content.threadId = x.threadId
        if (x.payload['parts']) {
          content.body = Buffer.from(
            x.payload['parts'][0].body.data,
            'base64'
          ).toString('ascii')
        } else {
          content.body = Buffer.from(x.payload.body.data, 'base64').toString(
            'ascii'
          )
        }
        content.link =
          'https://mail.google.com/mail/u/' + gmail + '/#all/' + x.id
        x.payload['headers'].map((y) => {
          if (y.name === 'From') {
            const start = y.value.indexOf('<') + 1
            const end = y.value.indexOf('>')
            content.email = y.value.substring(start, end)
            content.name = y.value.substring(0, start - 1)
          }
          if (y.name === 'Date') {
            content.date = y.value
          }
        })
        await Message.updateOne(
          { createdBy: this.userId, messageId: content.threadId },
          {
            createdBy: this.userId,
            messageSource: 'gmail',
            messageId: content.threadId,
            name: content.name,
            date: moment.parseZone(content.date).format(),
            body: content.body,
            email: content.email,
            link: content.link,
            sentiment: await sentimentAnalysis(content.body),
          },
          { upsert: true }
        )
        return content
      })
    )
    return threadId
  }
}

const fetchMail = async (req, res) => {
  const userId = req.user.userId
  const { gmail, googletoken } = req.body
  const mail = new GmailAPI(googletoken, userId)
  const result = await mail.readInboxContent(gmail)
  res.status(StatusCodes.OK).json({ result })
  result.map(async (x) => {
    await Contact.updateOne(
      {
        $or: [
          { name: { $regex: x.name, $options: 'i' } },
          { gmail: { $regex: x.email, $options: 'i' } },
          { gmail: { $regex: x.name, $options: 'i' } },
        ],
        createdBy: userId,
      },
      {
        name: x.name,
        gmail: x.email,
        createdBy: userId,
      },
      { upsert: true }
    )
  })
}

export { fetchMail }
