import express from 'express'
import BlogPost from '../models/Idea'

export const ideaRouter = express.Router()

ideaRouter.get('/', async (req, res) => {
  try {
    const data = await BlogPost.find({})
    res.status(200).json({ success: 1, data })
  } catch (err) {
    res.json({ success: 0, err })
  }
})

ideaRouter.post('/', express.json(), async (req, res) => {
  try {
    await BlogPost.collection.insertOne(req.body)
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.json({ success: 0, err })
  }
})

ideaRouter.put('/', express.json(), async (req, res) => {
  try {
    await BlogPost.findByIdAndUpdate({ _id: req.body.id }, req.body)
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.json({ success: 0, err })
  }
})

ideaRouter.delete('/', express.json(), async (req, res) => {
  try {
    await BlogPost.collection.insertOne(req.body)
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.json({ success: 0, err })
  }
})
