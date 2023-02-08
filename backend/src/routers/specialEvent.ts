import express from 'express'
import SpecialEvent from '../models/SpecialEvent'

export const specialEventRouter = express.Router()

specialEventRouter.get('/', async (req, res) => {
  try {
  } catch (err) {
    res.json({ success: 0, err })
  }
})

specialEventRouter.post('/', express.json(), async (req, res) => {
  try {
    await SpecialEvent.collection.insertOne(req.body)
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.json({ success: 0, err })
  }
})
