import { getPresignedUrl } from '../controllers/upload.controller'
import express from 'express'
import { authProtect } from '../middlewares/auth'
import Idea from '../models/Idea'
import { createIdea, deleteIdea, getAllIdeasOfUser, getDataSuggestion, getIdeas } from '../controllers/idea.controller'

export const ideaRouter = express.Router()

// ideaRouter.get('/', async (req, res) => {
//   try {
//     const data = await Idea.find({})
//     res.status(200).json({ success: 1, data })
//   } catch (err) {
//     res.json({ success: 0, err })
//   }
// })

// ideaRouter.post('/', express.json(), async (req, res) => {
//   try {
//     await Idea.collection.insertOne(req.body)
//     res.status(200).json({ success: 1 })
//   } catch (err) {
//     res.json({ success: 0, err })
//   }
// })

// ideaRouter.put('/', express.json(), async (req, res) => {
//   try {
//     await Idea.findByIdAndUpdate({ _id: req.body.id }, req.body)
//     res.status(200).json({ success: 1 })
//   } catch (err) {
//     res.json({ success: 0, err })
//   }
// })

// ideaRouter.delete('/', express.json(), async (req, res) => {
//   try {
//     await Idea.collection.insertOne(req.body)
//     res.status(200).json({ success: 1 })
//   } catch (err) {
//     res.json({ success: 0, err })
//   }
// })

ideaRouter.get('/', authProtect, getIdeas)
ideaRouter.get('/suggest', authProtect, getDataSuggestion)
ideaRouter.get('/ideasOfUser', authProtect, getAllIdeasOfUser)
ideaRouter.get('/preSignUrl', authProtect, getPresignedUrl)
ideaRouter.post('/create', authProtect, createIdea)
ideaRouter.delete('/delete/:ideaId', authProtect, deleteIdea)