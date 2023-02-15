import cors from 'cors'
import express from 'express'
import router from './routers/api'
import cookieParser from 'cookie-parser'
import { ReadConfig } from './config'
import initiateMongoServer from './common/db'

async function main() {
  const config = await ReadConfig()
  console.log(config)
  await initiateMongoServer(config.database.db_url!)

  const app = express()

  app.use(express.json())
  app.use(cookieParser())
  app.disable('x-powered-by')
  app.use(cors())
  router(app);
  console.log(`Server are listening on port: ${config.server.port}`)
  app.listen(config.server.port, '0.0.0.0', function() {
    const err = arguments[0]
    if (err) {
      console.log(err)
    }
  })
}
main().catch(err => console.log(`Cannot init server!, log: `, err))
