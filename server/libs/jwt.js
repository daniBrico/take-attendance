import jwt from 'jsonwebtoken'

export function createAccessToken(payload) {
  const { TOKEN_SECRET } = process.env

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: '1d',
      },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    )
  })
}
