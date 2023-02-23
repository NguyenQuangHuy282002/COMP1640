import mongoose from 'mongoose'
import { IBlogPost } from './Idea'

interface ISpecialEvent {
  title: string
  description: string
  startDate: Date
  firstCloseDate: Date
  finalCloseDate: Date
  blogPosts: Array<IBlogPost>
}

const eventSchema = new mongoose.Schema<ISpecialEvent>(
  {
    title: String,
    description: String,
    startDate: Date,
    firstCloseDate: Date,
    finalCloseDate: Date,
    blogPosts: Array<IBlogPost>,
  },
  { timestamps: { createdAt: true, updatedAt: true } }
)

const SpecialEvent = mongoose.model<ISpecialEvent>('SpecialEvent', eventSchema)

export default SpecialEvent
