import mongoose from 'mongoose'

interface IComments {
  userId: string
  content: string
}

export interface IBlogPost {
  publisherId: string
  category: string
  title: string
  description: string
  files?: string[]
  views: number
  like: number
  dislike: number
  comments: Array<IComments>
}

const blogPostSchema = new mongoose.Schema<IBlogPost>(
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

const BlogPost = mongoose.model<IBlogPost>('BlogPost', blogPostSchema)

export default BlogPost
