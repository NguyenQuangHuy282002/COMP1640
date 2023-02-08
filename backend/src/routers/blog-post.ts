import express from 'express'
import BlogPost from '../models/BlogPost'

export const blogPostRouter = express.Router()

blogPostRouter.get('/', async (req, res) => {
  try {
  } catch (err) {
    res.json({ success: 0, err })
  }
})

blogPostRouter.post('/', express.json(), async (req, res) => {
  try {
    await BlogPost.collection.insertOne(req.body)
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.json({ success: 0, err })
  }
})
