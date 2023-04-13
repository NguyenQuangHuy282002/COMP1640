import express from 'express'
import { authProtect, authorize } from '../middlewares/auth'
import { startBackup } from '../utils/backup'
const ReadConfig = require('../utils/config')
const { Connect, Process } = require('../lib/mongodb')

export const backupRouter = express.Router()

backupRouter.get('/', authProtect, authorize(['admin']), async (req, res) => {
  await startBackup()
  res.status(200).json({
    success: true,
    message: 'Backup data is successful',
  })
})

backupRouter.get('/all', authProtect, authorize(['admin']), async (req, res) => {
  try {
    const config = await ReadConfig()
    const slave = await Connect(config.database.slave.db_url)

    const listDatabases = await slave.db('backup').admin().listDatabases()
    const listBackups = listDatabases.databases
      .filter(db => db.name.includes('COMP-1640-version'))
      .sort((a, b) => Number(b.name.split('COMP-1640-version-')?.[1]) - Number(a.name.split('COMP-1640-version-')?.[1]))
    res.status(200).json({
      success: true,
      data: listBackups,
    })
  } catch (err) {
    console.log('err')
    res.status(400).json({
      success: false,
    })
  }
})
