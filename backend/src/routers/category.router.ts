import express from 'express'
import ApiErrorResponse from '../utils/ApiErrorResponse'
import Category from '../models/Category'

export const categoryRouter = express.Router()

categoryRouter.get('/', async (req, res) => {
  try {
    const data = await Category.find({})
    res.status(200).json({ success: 1, data: data })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})

categoryRouter.post('/', express.json(), async (req, res) => {
  try {
    const { name } = req.body
    await Category.findOneAndUpdate({ name }, { name }, { upsert: true })
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})

categoryRouter.post('/delete', express.json(), async (req, res, next) => {
  try {
    const { name } = req.body
    const category = await Category.findOne({ name: name })
    if (category.ideas.length > 0) {
      return next(new ApiErrorResponse(`category 'name' are already attached in ideas`, 400))
    }
    await Category.findOneAndDelete({ name })
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})
