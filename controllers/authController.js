import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'

const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    throw new BadRequestError('please provide all values')
  }
  const userAlreadyExists = await User.findOne({ email })
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use')
  }
  const user = await User.create({ name, email, password })
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      name: user.name,
    },
    token,
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const token = user.createJWT()
  user.password = undefined
  res.status(StatusCodes.OK).json({ user, token })
}

const updateUser = async (req, res) => {
  const { email, name, lastName } = req.body
  if (!email) {
    throw new BadRequestError('no email')
  }
  if (!name) {
    throw new BadRequestError('name')
  }
  if (!lastName) {
    throw new BadRequestError('no lastName')
  }

  if (!email || !name || !lastName) {
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.findOne({ _id: req.user.userId })

  user.email = email
  user.name = name
  user.lastName = lastName

  await user.save()

  const token = user.createJWT()
  console.log({ user, token })
  res.status(StatusCodes.OK).json({
    user,
    token,
  })
}

const loginGoogle = async (res, req, next) => {
  res.send('<a href="/auth/google">Authenticate with Google </a>')
}

export { register, login, updateUser, loginGoogle }
