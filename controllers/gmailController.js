import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import axios from 'axios'

class GmailAPI {
  accessToken = ''
  constructor(accessToken) {
    this.accessToken = accessToken
  }

  searchGmail = async (searchItem) => {
    var config = {
      method: 'get',
      url:
        'https://www.googleapis.com/gmail/v1/users/me/messages?q=' + searchItem,
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

  readInboxContent = async (searchText, gmail) => {
    var threadId = await this.searchGmail(searchText)

    threadId = await Promise.all(
      threadId.map(async (x) => {
        return this.readGmailContent(x)
      })
    )
    threadId = await Promise.all(
      threadId.map(async (x) => {
        let content = { body: '', email: '', name: '', date: '', link: '' }
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
        return content
      })
    )
    return threadId
  }
}

const fetchMail = async (req, res) => {
  const { gmail, accessToken, keyword } = req.body
  const mail = new GmailAPI(accessToken)
  const result = await mail.readInboxContent(keyword, gmail)
  res.status(StatusCodes.OK).json({
    result,
  })
}

export { fetchMail }
