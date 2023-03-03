import { createSubscription } from '../../libs/global-state-hook'

export const userStore = createSubscription({ isActivate: false, isBanned: false, role: '', name: '', _id: '', avatar: '', birthday: Date, email: '', phone: '', description: '', username: '', interests: [] })
