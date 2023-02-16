import User from '../models/User'
import express from 'express'

export const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
  try {
    const data = await User.find({})
    res.json(data)
  } catch (err) {
    res.json({ success: 0, err })
  }
})

userRouter.post('/', express.json(), async (req, res) => {
  try {
    await User.collection.insertOne(req.body)
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.json({ success: 0, err })
  }
})
