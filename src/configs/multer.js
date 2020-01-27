import { resolve } from 'path'
import { randomBytes } from 'crypto'

import { S3 } from 'aws-sdk'
import multerS3 from 'multer-s3'
import { diskStorage } from 'multer'

const destPath = resolve(__dirname, '..', '..', 'uploads')

const storageTypes = {
  local: diskStorage({
    destination: (req, file, cb) => {
      cb(null, destPath)
    },
    filename: (req, file, cb) => {
      const hash = randomBytes(16).toString('hex')
      const ext = file.originalname.split('.').pop()
      file.key = `${ hash }.${ ext }`
      cb(null, file.key)
    }
  }),
  s3: multerS3({
    s3: new S3(),
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      const hash = randomBytes(16).toString('hex')
      const ext = file.originalname.split('.').pop()
      const filename = `${ hash }.${ ext }`
      cb(null, filename)
    }
  })
}

const config = {
  dest: destPath,
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2097152
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif'
    ]

    if(allowedMimes.includes(file.mimetype))
      cb(null, true)
    else
      cb(new Error('Invalid file type'))
  }
}

export default config
