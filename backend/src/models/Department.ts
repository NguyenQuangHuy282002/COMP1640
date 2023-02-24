import mongoose from 'mongoose'

interface IDepartment {
  name: string
}

const departmentSchema = new mongoose.Schema<IDepartment>(
  {
    name: String,
  },
  { timestamps: { createdAt: true, updatedAt: true } }
)

const Department = mongoose.model<IDepartment>('Department', departmentSchema)

export default Department
