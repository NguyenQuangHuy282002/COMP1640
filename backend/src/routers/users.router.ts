import express from 'express'
import {
  changePassword,
  deactiveUser,
  deleteUser,
  find,
  findUser,
  getTotalAccounts,
  search,
  updateProfilePicture,
  updateUser,
} from '../controllers/user.controller'
import { authorize, authProtect } from '../middlewares/auth'

export const usersRouter = express.Router()

usersRouter.get('/', authProtect, authorize(['admin']), find)
usersRouter.delete('/deleteUser/:userId', authProtect, authorize(['admin']), deleteUser)
usersRouter.post('/deactiveUser', authProtect, authorize(['admin']), deactiveUser)
usersRouter.put('/changePassword', authProtect, changePassword)
usersRouter.put('/updateProfile', authProtect, updateUser)
usersRouter.put('/updateProfilePicture', authProtect, updateProfilePicture)
usersRouter.get('/search/:searchTerm', authProtect, search)
usersRouter.get('/getProfile/:id', authProtect, findUser)
usersRouter.get('/totalAccount', authProtect, authorize(['manager']), getTotalAccounts)
