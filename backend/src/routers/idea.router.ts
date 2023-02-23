import { getPresignedUrl } from '../controllers/upload.controller'
import express from 'express'
import { authProtect } from '../middlewares/auth'

export const ideaRouter = express.Router()

ideaRouter.get('/preSignUrl', authProtect, getPresignedUrl)