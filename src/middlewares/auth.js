import { verify } from 'jsonwebtoken'
import { promisify } from 'util'

export default async function(req, res, next) {
  const authHeader = req.headers.authorization

  if(!authHeader)
    return res.status(401).send({ error: 'No token provided' })

  const [scheme, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(verify)(token, process.env.JWT_SECRET_KEY)
    req.userId = decoded.id
    return next()
  } catch (error) {
    return res.status(401).send({ error: 'Invalid token' })
  }
}
