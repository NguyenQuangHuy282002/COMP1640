import User from '../models/User'
import express from 'express'

export const usersRouter = express.Router()

usersRouter.get('/', async (req, res) => {
  try {
    const data = await User.find({ $ne: { role: 'admin' } })
    res.json(data)
  } catch (err) {
    res.status(400).json({ success: 0, err })
  }
})

usersRouter.post('/', express.json(), async (req, res) => {
  try {
    const { name, username, password, email, role } = req.body
    await User.collection.insertOne({ name, username, password, email, role, isActivate: true })
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.status(400).json({ success: 0, err })
  }
})
