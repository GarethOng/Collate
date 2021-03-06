import express from 'express'
const router = express.Router()
import { fetchMail } from '../controllers/gmailController.js'
import authenticateUser from '../middleware/auth.js'

router.route('/fetch').post(authenticateUser, fetchMail)

export default router
