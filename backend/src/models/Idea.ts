import { Document, Schema, model, Model } from 'mongoose'

interface IComments {
  userId: string
  content: string
}

interface ICategory {
  categoryId: string
  name: string
}

export interface IIdea {
  publisherId: string
  categories: Array<ICategory>
  title: string
  content: string
  files?: string[]
  views: number
  votes: number
  comments: Array<IComments>
}

const ideaSchema = new mongoose.Schema<IBlogPost>(
  {
    publisherId: String,
    category: String,
    title: String,
    description: String,
    files: Array<String>,
    views: Number,
    like: Number,
    dislike: Number,
    comments: Array<IComments>,
  },
  { timestamps: { createdAt: true, updatedAt: true } }
)
const User: Model<IUser> = model<IUser>('User', userSchema)

const BlogPost: Model<IUser> = mongoose.model<IBlogPost>('BlogPost', blogPostSchema)

export default BlogPost


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
  description?: string
  interests?: string[]
  isBanned: boolean
}

const userSchema = new Schema<IUser>(
  {
    name: String,
    token: String,
    role: {
      type: String,
      enum: ['staff', 'coordinator', 'manager'],
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

