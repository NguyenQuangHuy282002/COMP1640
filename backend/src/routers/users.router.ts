import User from '../models/User'
import express from 'express'
import { authorize, authProtect } from '../middlewares/auth'
import {
  changePassword,
  deleteUser,
  find,
  findUser,
  search,
  updateProfilePicture,
  updateUser,
} from '../controllers/user.controller'

export const usersRouter = express.Router()

usersRouter.get('/', authProtect, find)
usersRouter.delete('/deleteUser', authProtect, authorize(['admin']), deleteUser)
usersRouter.put('/changePassword', authProtect, changePassword)
usersRouter.put('/updateProfile', authProtect, updateUser)
usersRouter.put('/updateProfilePicture', authProtect, updateProfilePicture)
usersRouter.get('/search/:searchTerm', authProtect, search)
usersRouter.get('/getProfile/:username', authProtect, findUser)
