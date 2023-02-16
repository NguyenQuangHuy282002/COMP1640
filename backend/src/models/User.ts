import { Document, Schema, model, Model } from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser extends Document {
  name: string
  token: string
  password: string
  resetPasswordToken: string
  resetPasswordData: Date
  isActivate: boolean
  role: string
  username: string
  birthday: string
  email: string
  image?: string
  phone?: string
  courses?: string[]
  interests?: string[] 
  isBanned: boolean
}

const userSchema = new Schema<IUser>(
  {
    name: String,
    token: String,
    role: {
      type: String,
      enum: ['staff', 'coordinator', 'QAmanager'],
      default: 'staff',
    },
    isActivate: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordData: Date,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    birthday: String,
    phone: String,
  },

  { timestamps: { createdAt: true, updatedAt: true } }
)




const User: Model<IUser> = model<IUser>('User', userSchema)

export default User
