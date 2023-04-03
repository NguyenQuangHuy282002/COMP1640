import express from 'express'
import { authProtect, authorize } from '../middlewares/auth'
import { startBackup } from '../utils/backup'

export const backupRouter = express.Router()

backupRouter.get('/', authProtect, authorize(['admin']), async (req, res) => {
  await startBackup()
  res.status(200).json({
    success: true,
    message: 'Backup data is successful',
  })
})
