import { User } from '../models'

import { randomBytes } from 'crypto'
import Queue from '../configs/queue'

export async function login(body) {
  const { email, password } = body
  const user = await User.findOne({ email })

  if(!user)
    throw { message: 'User not found' }

  if(!(await user.compareHash(password)))
    throw { message: 'Invalid password' }

  return user
}

export async function forgotPassword(body) {
  const { email } = body
  const user = await User.findOne({ email })

  if(!user)
    throw { message: 'User not found' }

  const token = randomBytes(20).toString('hex')

  const expires = new Date()
  expires.setHours(expires.getHours() + 1)

  user.passwordResetToken = token
  user.passwordResetExpires = expires

  await user.save()

  await Queue.add('ForgotPasswordMail', { user, token })

  return null
}

export async function resetPassword(body) {
  const { token, password } = body
  const user = await User.findOne({ passwordResetToken: token })

  if(!user)
    throw { message: 'Invalid token' }

  const now = new Date

  if(now > user.passwordResetExpires)
    throw { message: 'Expired token' }

  user.password = password
  user.passwordResetToken = null,
  user.passwordResetExpires = null

  await user.save()

  return null
}
