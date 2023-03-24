import express from 'express'
import {
  createAccount,
  login,
  refreshToken,
  sendVerificationEmail,
  verifyAccessToken,
} from '../controllers/auth.controller'
import { authorize, authProtect } from '../middlewares/auth'

const authRouter = express.Router()

authRouter.post('/create', authProtect, authorize(['admin']), createAccount)
authRouter.post('/login', login)
authRouter.post('/sendVerificationEmail', authProtect, sendVerificationEmail)
authRouter.post('/verifyToken', verifyAccessToken)
authRouter.get('/refreshToken', authProtect, refreshToken)

export default authRouter
