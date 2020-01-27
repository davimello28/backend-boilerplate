import { Schema, model } from 'mongoose'

import { sign } from 'jsonwebtoken'
import { hash, compare } from 'bcrypt'

import { isEmail } from '../utils'

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      validate(value) {
        if(!isEmail(value))
          throw new Error('Invalid email')
      }
    },
    password: {
      type: String,
      required: true
    },
    passwordResetToken: {
      type: String
    },
    passwordResetExpires: {
      type: Date
    },
    avatar: {
      type: String,
      default: null
    }
  }, {
    timestamps: true
  }
)

UserSchema.pre('save', async function() {
  if(!this.isModified('password')) return
  this.password = await hash(this.password, 10)
})

UserSchema.methods = {
  toJSON() {
    const obj = this.toObject()
    delete obj.password
    delete obj.passwordResetToken
    delete obj.passwordResetExpires
    return obj
  },

  compareHash(passHash) {
    return compare(passHash, this.password)
  },

  generateToken() {
    return sign({ id: this.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 86400
    })
  }
}

export default model('User', UserSchema)
