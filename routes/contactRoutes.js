import express from 'express'
const router = express.Router()
import { addContact } from '../controllers/contactController.js'

router.route('/addContact').post(addContact)

export default router
