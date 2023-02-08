import mongoose from 'mongoose'

interface ICategory {
  name: string
}

const categorySchema = new mongoose.Schema<ICategory>(
  {
    name: String,
  },
  { timestamps: { createdAt: true, updatedAt: true } }
)

const Category = mongoose.model<ICategory>('Category', categorySchema)

export default Category
