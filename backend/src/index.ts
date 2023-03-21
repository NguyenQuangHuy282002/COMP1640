import cors from 'cors'
import express from 'express'
import router from './routers/api'
import cookieParser from 'cookie-parser'
import { ReadConfig } from './config'
import initiateMongoServer from './common/db'
import User from './models/User'

async function main() {
  const config = await ReadConfig()
  await initiateMongoServer(config.database.db_url!)

  const app = express()

  app.use(express.json())
  app.use(cookieParser())
  app.disable('x-powered-by')
  app.use(cors())
  router(app)
  console.log(`listen on ${config.server.port}`)
  await User.seedAdmin() // clone code ve xoa het account trong mongo de tao tk admin
  // khi tai khoan admin dc tao roi thi comment dong ben tren vao. tk: admin, mk: admin

  app.listen(Number(config.server.port), '0.0.0.0', () => {
    const err = arguments[0]
    if (err) {
      console.error(err)
    }
  })
}
main().catch(err => console.error(`Cannot init server!, log: `, err))
