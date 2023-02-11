export interface IUserInfo {
  name: string
  isActivate?: boolean
  role: string
  username: string
  birthday: string
  email: string
  image?: string
  phone?: string
  courses?: string[] | Array<any>
  description?: string
  interests?: string[]
}
