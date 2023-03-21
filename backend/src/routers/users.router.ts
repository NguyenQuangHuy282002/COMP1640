import express from 'express'
import {
  changePassword,
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
usersRouter.delete('/deleteUser/:userId', authProtect, deleteUser)
usersRouter.put('/changePassword', authProtect, changePassword)
usersRouter.put('/updateProfile', authProtect, updateUser)
usersRouter.put('/updateProfilePicture', authProtect, updateProfilePicture)
usersRouter.get('/search/:searchTerm', authProtect, search)
usersRouter.get('/getProfile/:username', authProtect, findUser)
usersRouter.get('/totalAccount', authProtect, authorize(['manager']), getTotalAccounts)
