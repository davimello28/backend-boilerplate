import mongoose from 'mongoose'
import { User } from '../models'

import { File } from './'

const checkDuplicateEmail = async (email, excludeId) => {
  const user = await User.findOne({ email, _id: { $ne: excludeId } })
  if(user)
    throw { message: 'Email already taken' }
}

export async function create(body) {
  await checkDuplicateEmail(body.email)
  return await User.create(body)
}

export async function getAll() {
  return await User.find()
}

export async function getOne(id) {
  const validId = mongoose.Types.ObjectId.isValid(id)
  if(!validId)
    throw { message: 'Invalid user ID' }

  const user = await User.findById(id)

  if(!user)
    throw { message: 'User not found' }

  return user
}

export async function update(id, file, body) {
  const validId = mongoose.Types.ObjectId.isValid(id)
  if(!validId)
    throw { message: 'Invalid user ID' }

  const user = await User.findById(id)

  if(!user)
    throw { message: 'User not found' }

  if(file) {
    const avatar = await File.create(file)
    user.avatar = avatar.url
  } else if(body.avatar)
    throw { message: 'Invalid avatar format' }
  else if(body.avatar !== undefined && user.avatar)
    await File.destroy({ url: user.avatar })

  if(body.email)
    await checkDuplicateEmail(body.email, id)

  Object.keys(body).map(item => user[item] = body[item])
  await user.save()
  return user
}

export async function destroy(id) {
  const validId = mongoose.Types.ObjectId.isValid(id)

  if(!validId)
    throw { message: 'Invalid user ID' }

  const user = await User.findById(id)

  if(!user)
    throw { message: 'User not found' }

  await user.remove()
  return user
}
