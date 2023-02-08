import mongoose from 'mongoose'

enum Role {
  ADMIN = 'admin',
  STAFF = 'staff',
  Manager = 'manager',
  COORDINATOR = 'coordinator',
}

interface IUser {
  name: string
  role: Role
  username: string
  birthday: string
  phone: string
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: String,
    role: Role,
    username: String,
    birthday: String,
    phone: String,
  },
  { timestamps: { createdAt: true, updatedAt: true } }
)

const User = mongoose.model<IUser>('PublishedPageCount', userSchema)

export default User
