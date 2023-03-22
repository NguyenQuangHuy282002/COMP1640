import { Document, Schema, model, Model, Types } from 'mongoose'

export interface IHastag extends Document {
  name: string;
}

const hastagSchema = new Schema<IHastag>({
  name: { type: String, required: true },
  
}, { timestamps: { createdAt: true, updatedAt: true } });

const Hastag: Model<IHastag> = model<IHastag>('Hastag', hastagSchema)

export default Hastag

