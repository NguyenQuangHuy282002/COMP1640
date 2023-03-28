import express from 'express'
import Department from '../models/Department'
import { authorize, authProtect } from '../middlewares/auth'

export const departmentRouter = express.Router()

departmentRouter.get('/', authProtect, async (req, res) => {
  try {
    const data = await Department.find({})
    res.status(200).json({ success: 1, data: data })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})

departmentRouter.post('/', authProtect, authorize(['admin']), express.json(), async (req, res) => {
  try {
    const { name, oldName } = req.body
    await Department.findOneAndUpdate({ oldName }, { name }, { upsert: true })
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})

departmentRouter.post('/delete', authProtect, authorize(['manager']), express.json(), async (req, res) => {
  try {
    const { name } = req.body
    await Department.findOneAndDelete({ name })
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})
