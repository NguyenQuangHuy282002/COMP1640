import { createSubscription } from '../../libs/global-state-hook'

export const userStore = createSubscription({ isActivate: false, isBanned: false, role: '', username: '', _id: '' })
