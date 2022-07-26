import Contact from '../models/Contact.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import Message from '../models/Message.js'
/*
const addContact = async (req, res) => {
  const { name, gmail, relationship } = req.body
  if (!name) {
    throw new BadRequestError('Please provide a name for contact')
  }
  const contact = await Contact.findOneAndUpdate(
    {
      name: name,
      createdBy: req.user.userId,
    },
    req.body,
    { upsert: true, returnNewDocument: true }
  )
  res.status(StatusCodes.CREATED).json({ contact })
}
*/

const addContact = async (req, res) => {
  const { name, gmail, relationship } = req.body
  if (!name || !gmail || !relationship) {
    throw new BadRequestError('Please provide all values!')
  }
  const userId = req.user.userId
  const contact = await Contact.findOne({
    name: name,
    createdBy: userId,
  })
  if (!contact) {
    const newContact = await Contact.create({
      name,
      gmail,
      relationship,
      createdBy: userId,
    })
    res.status(StatusCodes.CREATED).json(newContact)
  }
}

const getAllContact = async (req, res) => {
  const userId = req.user.userId
  const { keyword, status } = req.body
  console.log(req.body)
  if (keyword) {
    const contacts = await Contact.find({
      createdBy: userId,
      name: { $regex: keyword },
    })
    console.log(contacts)
    res
      .status(StatusCodes.OK)
      .json({ contacts: contacts, totalContacts: contacts.length })
  } else {
    const contacts = await Contact.find({
      createdBy: userId,
    })
    res
      .status(StatusCodes.OK)
      .json({ contacts: contacts, totalContacts: contacts.length })
  }
}

const getContact = async (req, res) => {
  const userId = req.user.userId
  const { keyword, relationship } = req.query
  const queryObject = { createdBy: userId }

  if (keyword) {
    queryObject.name = { $regex: keyword, $options: 'i' }
  }
  if (relationship !== 'unclassified') {
    queryObject.relationship = relationship
  }
  const contacts = await Contact.find(queryObject)
  res
    .status(StatusCodes.OK)
    .json({ contacts: contacts, totalContacts: contacts.length })
}

const editContact = async (req, res) => {
  const { id: contactId } = req.params
  const { name, email, relationship, telegram } = req.body
  if ((!name, !email, !relationship)) {
    throw new BadRequestError('Please provide all values')
  }
  const contact = await Contact.findOne({ _id: contactId })

  if (!contact) {
    throw new NotFoundError(`No contact with id :${contactId}`)
  }

  checkPermissions(req.user, contact.createdBy)
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  await Message.updateMany(
    { email, createdBy: req.user.userId },
    { $set: { relationship: relationship } }
  )
  res.status(StatusCodes.OK).json(updatedContact)
}

export { addContact, getAllContact, getContact, editContact }
