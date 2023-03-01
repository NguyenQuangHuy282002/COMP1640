import express from 'express'
import Department from '../models/Department'

export const departmentRouter = express.Router()

departmentRouter.get('/', async (req, res) => {
  try {
    const data = await Department.find({})
    res.status(200).json({ success: 1, data: data })
  } catch (err) {
    res.json({ success: 0, err })
  }
})

departmentRouter.post('/', express.json(), async (req, res) => {
  try {
    const { name, oldName } = req.body
    await Department.findOneAndUpdate({ oldName }, { name }, { upsert: true })
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.json({ success: 0, err })
  }
})

departmentRouter.post('/delete', express.json(), async (req, res) => {
  try {
    const { name } = req.body
    await Department.findOneAndDelete({ name })
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.json({ success: 0, err })
  }
})
