import { getPresignedUrl } from '../controllers/upload.controller'
import express from 'express'
import { authProtect } from '../middlewares/auth'
import Idea from '../models/Idea'
import { createIdea, deleteIdea, disLikeIdea, editIdea, getAllIdeasOfUser, getDataSuggestion, getIdea, getIdeas, getPostLikes, likeIdea } from '../controllers/idea.controller'

export const ideaRouter = express.Router()

ideaRouter.get('/', authProtect, getIdeas)
ideaRouter.get('/suggest', authProtect, getDataSuggestion)
ideaRouter.get('/ideasOfUser', authProtect, getAllIdeasOfUser)
ideaRouter.get('/preSignUrl', authProtect, getPresignedUrl)
ideaRouter.get('/detail', authProtect, getIdea)
ideaRouter.get('/ideaLikes', authProtect, getPostLikes)
ideaRouter.post('/create', authProtect, createIdea)
ideaRouter.put('/dislike', authProtect, disLikeIdea)
ideaRouter.put('/like', authProtect, likeIdea)
ideaRouter.put('/edit/:ideaId', authProtect, editIdea)
ideaRouter.delete('/delete/:ideaId', authProtect, deleteIdea)