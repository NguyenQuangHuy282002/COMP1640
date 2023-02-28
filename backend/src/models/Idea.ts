import { Document, Schema, model, Model, Types } from 'mongoose'
import { ICategory } from './Category'
import { IComment } from './Comment'
import { ISpecialEvent } from './SpecialEvent'
import { IUser } from './User'


export interface IIdea extends Document{
  publisherId: IUser['_id'],
  categories?: ICategory['_id'][]
  title: string
  content: string
  files?: string[]
  views?: number
  like?: number
  dislike?: number
  comments?: IComment['_id'][]
  createdAt?: Date
  specialEvent: ISpecialEvent['_id']
  isIncognito?: boolean
}

const ideaSchema = new Schema<IIdea>(
  {
    publisherId: { type: Types.ObjectId, ref: 'User'},
    categories: [{ type: Types.ObjectId, ref: 'Category' }],
    title: String,
    content: String,
    files: Array<String>,
    views: { type: Number, required: false, default: 0 },
    like: { type: Number, required: false, default: 0 },
    dislike: { type: Number, required: false, default: 0 },
    comments: [ { type: Types.ObjectId, ref: 'Comment'}],
    createdAt: { type: Date, default: Date.now },
    specialEvent: { type: Types.ObjectId, ref: 'SpecialEvent', required: false },
    isIncognito: { type: Boolean, default: false, required: false }
  },
  { timestamps: { updatedAt: true } }
)

const Idea: Model<IIdea> = model<IIdea>('Idea', ideaSchema)

export default Idea

