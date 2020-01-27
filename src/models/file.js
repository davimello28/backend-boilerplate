import { Schema, model } from 'mongoose'

import { promisify } from 'util'
import { resolve } from 'path'
import { unlink } from 'fs'
import { S3 } from 'aws-sdk'

const s3 = new S3()

const FileSchema = new Schema(
  {
    name: String,
    size: Number,
    key: String,
    url: String,
  }, {
    timestamps: true
  }
)

FileSchema.pre('save', function() {
  if(!this.url)
    this.url = `${ process.env.API_URL }/files/${ this.key }`
})

FileSchema.pre('remove', function() {
  if(process.env.STORAGE_TYPE === 's3')
    return s3.deleteObject({
      Bucket: process.env.AWS_BUCKET,
      Key: this.key
    }).promise()
  else
    return promisify(unlink)(
      resolve(__dirname, '..', '..', 'uploads', this.key)
    )
})

export default model('File', FileSchema)
