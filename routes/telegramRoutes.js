import express from 'express'
const router = express.Router()
import { getMessage } from '../controllers/telegramController.js'
import authenticateUser from '../middleware/auth.js'

router.route('/fetch').post(authenticateUser, getMessage)

export default router
