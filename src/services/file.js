import mongoose from 'mongoose'
import { File } from '../models'

export async function create(file) {
  const { originalname: name, size, key, location: url = '' } = file
  return await File.create({
    name,
    size,
    key,
    url
  })
}

export async function destroy(filter) {
  if(filter._id) {
    const validId = mongoose.Types.ObjectId.isValid(filter._id)
    if(!validId)
      throw { message: 'Invalid file ID' }
  }

  const file = await File.findOne(filter)
  await file.remove()
  return file
}
