import express from 'express'
const app = express()
import dontev from 'dotenv'
dontev.config()
import 'express-async-errors'

// db and authenticateUser
import connectDB from './db/connect.js'

// routers
import authRouter from './routes/authRoutes.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

app.use(express.json())

app.get('/', (req, res) => {
  res.json('Welcome!')
})

app.get('/api/v1', (req, res) => {
  res.json('Proxy connected!')
})

app.use('/api/v1/auth', authRouter)

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
