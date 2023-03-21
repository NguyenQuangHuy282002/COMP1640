import express from 'express'
import {
  createIdea,
  deleteIdea,
  disLikeIdea,
  editIdea,
  getAllIdeasByCategory,
  getAllIdeasByDepartment,
  getAllIdeasOfUser,
  getDataSuggestion,
  getIdea,
  getIdeas,
  getPostLikes,
  getTotalIdea,
  likeIdea,
  omitVoteIdea,
} from '../controllers/idea.controller'
import { getPresignedUrl } from '../controllers/upload.controller'
import { authorize, authProtect } from '../middlewares/auth'

export const ideaRouter = express.Router()

ideaRouter.get('/', authProtect, getIdeas)
ideaRouter.get('/suggest', authProtect, getDataSuggestion)
ideaRouter.get('/ideasOfUser', authProtect, getAllIdeasOfUser)
ideaRouter.get('/ideasByCategory', authProtect, getAllIdeasByCategory)
ideaRouter.get('/ideasByDepartment', authProtect, getAllIdeasByDepartment)
ideaRouter.get('/preSignUrl', authProtect, getPresignedUrl)
ideaRouter.get('/detail', authProtect, getIdea)
ideaRouter.get('/ideaLikes', authProtect, getPostLikes)
ideaRouter.post('/create', authProtect, createIdea)
ideaRouter.put('/dislike', authProtect, disLikeIdea)
ideaRouter.put('/like', authProtect, likeIdea)
ideaRouter.put('/omitVote', authProtect, omitVoteIdea)
ideaRouter.put('/edit/:ideaId', authProtect, editIdea)
ideaRouter.delete('/delete/:ideaId', authProtect, deleteIdea)
ideaRouter.get('/totalIdea', authProtect, authorize(['manager']), getTotalIdea)
