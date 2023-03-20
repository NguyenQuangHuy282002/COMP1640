import express from 'express'
import { createAccount, login, refreshToken, sendVerificationEmail, verifyAccessToken } from '../controllers/auth.controller'
import { authProtect } from '../middlewares/auth'

const authRouter = express.Router()

authRouter.post('/create', authProtect, createAccount)
authRouter.post('/login', login)
authRouter.post('/sendVerificationEmail', sendVerificationEmail)
authRouter.post('/verifyToken', verifyAccessToken)
authRouter.get('/refreshToken', authProtect, refreshToken)

export default authRouter
