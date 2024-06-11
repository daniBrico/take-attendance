import jwt from 'jsonwebtoken'

export const authRequired = (req, res, next) => {
  const { token } = req.cookies
  const { TOKEN_SECRET } = process.env

  if (!token)
    return res.status(401).json({ meessage: 'No token, authorization denied' })

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' })

    req.user = user

    next()
  })
}
