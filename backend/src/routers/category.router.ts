import express from 'express'
import Category from '../models/Category'

export const categoryRouter = express.Router()

categoryRouter.get('/', async (req, res) => {
  try {
    const data = await Category.find({})
    res.status(200).json({ success: 1, data: data })
  } catch (err) {
    res.json({ success: 0, err })
  }
})

categoryRouter.post('/', express.json(), async (req, res) => {
  try {
    const { name } = req.body
    await Category.findOneAndUpdate({ name }, { name }, { upsert: true })
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.json({ success: 0, err })
  }
})

categoryRouter.post('/delete', express.json(), async (req, res) => {
  try {
    const { name } = req.body
    await Category.findOneAndDelete({ name })
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.json({ success: 0, err })
  }
})
