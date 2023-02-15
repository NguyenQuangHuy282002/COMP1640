import express from 'express'
import ApiErrorResponse from '../utils/ApiErrorResponse'
import Category from '../models/Category'
import { io } from '../utils/socket'


export const updateIdeaNumberRealTime = async () => {
  const now = new Date()
  const totalEventAvailable = await Category.find({ firstCloseDate: { $gt: now } })
  io.emit('total_event_available', { total: totalEventAvailable.length })
}

export const categoryRouter = express.Router()

categoryRouter.get('/', async (req, res) => {
  try {
    const { id } = req.query
    const data = await Category.find(id ? { _id: id } : {})
    res.status(200).json({ success: 1, data })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})


categoryRouter.post('/', express.json(), async (req, res) => {
  // specialEventRouter.post('/', authProtect, authorize(['admin']), express.json(), async (req, res) => {
  try {
    const { _id, name} = req.body
    if (_id) {
      await Category.findOneAndUpdate(
        { _id },
        {
          name
        },
        { upsert: true }
      )
    } else {
      await Category.collection.insertOne({
        name
      })
    }
    res.status(200).json({ success: 1 })
    updateIdeaNumberRealTime()
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})

categoryRouter.delete('/:id', express.json(), async (req, res) => {
  try {
    const eventId = req.params.id
    await Category.findByIdAndDelete(eventId)
    updateIdeaNumberRealTime()

    res.status(200).json({ success: 1 })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})