import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import EmailValidate from '../models/mongoDB/schemas/auth/EmailValidate.js'
import Professor from '../models/mongoDB/schemas/auth/Professor.js'
import Student from '../models/mongoDB/schemas/auth/Student.js'

const saveUser = async (UserModel, userData, res) => {
  try {
    const newUser = new UserModel(userData)
    let userType = 'student'

    if (newUser.collection.collectionName === 'professors')
      userType = 'proffesor'

    newUser.password = await newUser.encryptPassword(userData.password)
    const userSaved = await newUser.save()

    const token = await createAccessToken({ id: userSaved._id, role: userType })

    res.cookie('token', token)

    res.json({
      id: userSaved._id,
      name: userSaved.name,
      lastName: userSaved.lastName,
      email: userSaved.email,
    })
  } catch (err) {
    res.status(500).json({ message: [`${err.message}`] })
  }
}

export const register = async (req, res) => {
  const { name, lastName, email, password } = req.body

  try {
    const emailValidateFound = await EmailValidate.findOne({ email })

    if (emailValidateFound) {
      const professorFound = await Professor.findOne({ email })

      if (professorFound) {
        return res
          .status(400)
          .json({ message: ['The email is already in use'] })
      }

      await saveUser(Professor, { name, lastName, email, password }, res)
    } else {
      const studentFound = await Student.findOne({ email })

      if (studentFound) {
        return res
          .status(400)
          .json({ message: ['The email is already in use'] })
      }

      await saveUser(Student, { name, lastName, email, password }, res)
    }
  } catch (err) {
    res.status(500).json({ message: [`${err.message}`] })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    let userFound = await Professor.findOne({ email })

    if (!userFound) userFound = await Student.findOne({ email })

    if (!userFound) return res.status(400).json({ message: 'User not found' })

    let userType = 'student'

    if (userFound.collection.collectionName === 'professors')
      userType = 'professor'

    const isMatch = await userFound.matchPassword(password)

    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' })

    const token = await createAccessToken({ id: userFound._id, role: userType })

    res.cookie('token', token)

    res.json({
      id: userFound._id,
      name: userFound.name,
      lastName: userFound.lastName,
      email: userFound.email,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const logout = (req, res) => {
  res.cookie('token', '', {
    expire: new Date(0),
  })

  return res.sendStatus(200)
}

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)

  if (!userFound) return res.status(400).json({ message: 'User not found' })

  return res.json({
    id: userFound._id,
    name: userFound.name,
    lastName: userFound.lastName,
    email: userFound.email,
  })
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies

  if (!token) return res.status(401).json({ message: 'Not authorized' })

  const { TOKEN_SECRET } = process.env

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: 'Not authorized' })

    let userFound = await Professor.findById(user.id)

    if (!userFound) userFound = await Student.findById(user.id)

    if (!userFound) return res.status(401).json({ meessage: 'Not authorized' })

    return res.json({
      id: userFound._id,
      name: userFound.name,
      lastName: userFound.lastName,
      email: userFound.email,
    })
  })
}
