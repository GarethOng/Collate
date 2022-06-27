import Contact from '../models/Contact.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'

const addContact = async (req, res) => {
  const { name, gmail, relationship } = req.body
  if (!name) {
    throw new BadRequestError('Please provide a name for contact')
  }
  console.log(req.body)
  req.body.createdBy = req.user.userId
  const contact = await Contact.create(req.body)
  res.status(StatusCodes.CREATED).json({ contact })
}

export { addContact }
