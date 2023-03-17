import express from 'express'
import SpecialEvent from '../models/SpecialEvent'

export const specialEventRouter = express.Router()

specialEventRouter.get('/', async (req, res) => {
  try {
    const { id } = req.query
    const data = await SpecialEvent.find(id ? { _id: id } : {})
    res.status(200).json({ success: 1, data })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})

specialEventRouter.get('/available', async (req, res) => {
  try {
    const now = new Date()
    const data = await SpecialEvent.find({ firstCloseDate: { $gt: now } })
    res.status(200).json({ success: 1, data })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})

specialEventRouter.post('/', express.json(), async (req, res) => {
  // specialEventRouter.post('/', authProtect, authorize(['admin']), express.json(), async (req, res) => {
  try {
    const { _id, title, description, startDate, firstCloseDate, finalCloseDate } = req.body
    if (_id) {
      await SpecialEvent.findOneAndUpdate(
        { _id },
        {
          title,
          description,
          startDate: new Date(startDate),
          firstCloseDate: new Date(firstCloseDate),
          finalCloseDate: new Date(finalCloseDate),
        },
        { upsert: true }
      )
    } else {
      await SpecialEvent.collection.insertOne({
        title,
        description,
        startDate: new Date(startDate),
        firstCloseDate: new Date(firstCloseDate),
        finalCloseDate: new Date(finalCloseDate),
      })
    }
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})

specialEventRouter.delete('/:id', express.json(), async (req, res) => {
  try {
    const eventId = req.params.id
    await SpecialEvent.findByIdAndDelete(eventId)
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})
