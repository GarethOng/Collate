import express from 'express'
const router = express.Router()

import { fetchMail } from '../controllers/gmailController.js'

router.route('/fetch').post(fetchMail)

export default router
