import express from 'express'
const app = express()
import dontev from 'dotenv'
dontev.config()
import 'express-async-errors'
import morgan from 'morgan'

// db and authenticateUser
import connectDB from './db/connect.js'

// routers
import authRouter from './routes/authRoutes.js'
import gmailRouter from './routes/gmailRoutes.js'
import contactRouter from './routes/contactRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import telegramRouter from './routes/telegramRoutes.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

// production
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(express.json())

//set up sentiment analysis function
import { spawn } from 'child_process'
import { callbackify } from 'util'
import { resolve } from 'path'
import { rejects } from 'assert'
const sentimentAnalyzer = (pythonScriptPath, text) => {
  const python = spawn('python', [pythonScriptPath, text])
  return new Promise((resolve, rejects) => {
    let result = ''
    python.stdout.on('data', (data) => {
      result += data
    })
    python.on('close', () => {
      resolve(result)
    })
    python.on('error', (err) => {
      rejects(err)
    })
  })
}
const sentimentAnalysis = async (text) => {
  let result = ''
  await sentimentAnalyzer('./sentiment.py', text).then(
    (output) => (result = output)
  )
  result = parseFloat(result)
  return result
}

app.get('/', (req, res) => {
  res.json('Welcome!')
})

app.get('/api/v1', (req, res) => {
  res.json('Proxy connected!')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/gmail', gmailRouter)
app.use('/api/v1/contact', contactRouter)
app.use('/api/v1/message', messageRouter)
app.use('/api/v1/telegram', telegramRouter)

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5001

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()

export { sentimentAnalysis }
