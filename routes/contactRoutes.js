import express from 'express'
const router = express.Router()
import {
  addContact,
  getContact,
  editContact,
} from '../controllers/contactController.js'
import authenticateUser from '../middleware/auth.js'
router.route('/addContact').post(authenticateUser, addContact)
router.route('/getAllContact').get(authenticateUser, getContact)
router.route('/:id').patch(authenticateUser, editContact)

export default router
