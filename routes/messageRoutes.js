import express from 'express'
const router = express.Router()
import { getMessage, markRead } from '../controllers/messageController.js'
import authenticateUser from '../middleware/auth.js'

router.route('/getMessage').post(authenticateUser, getMessage)
router.route('/markRead').post(authenticateUser, markRead)

export default router
