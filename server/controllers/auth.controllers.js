import User from '../models/mongoDB/User.js'
import { createAccessToken } from '../libs/jwt.js'

export const register = async (req, res) => {
  const { name, lastName, email, password } = req.body

  try {
    const newUser = new User({
      name,
      lastName,
      email,
      password,
    })

    newUser.password = await newUser.encryptPassword(password)

    const userSaved = await newUser.save()
    console.log(newUser)

    const token = await createAccessToken({ id: userSaved._id })

    res.cookie('token', token)

    res.json({
      id: userSaved._id,
      name: userSaved.name,
      lastName: userSaved.lastName,
      email: userSaved.email,
    })
  } catch (err) {
    re.status(500).json({ message: err.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const userFound = await User.findOne({ email })

    if (!userFound) return res.status(400).json({ message: 'User not found' })

    const isMatch = await userFound.matchPassword(password)

    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' })

    const token = await createAccessToken({ id: userFound._id })

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
