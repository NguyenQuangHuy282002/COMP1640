import cors = require('cors')
import express = require('express')
import mongoose from 'mongoose'
import router from '../src/routers/api'
import { ReadConfig } from './config'

const initiateMongoServer = async (MONGO_URL: string): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URL)

    console.log('Connected to DB !!')
  } catch (e) {
    console.log(e)
    throw e
  }
}

async function main() {
  const config = await ReadConfig()
  console.log(config)
  await initiateMongoServer(config.database.db_url)

  const app = express()
  app.use(express.json())
  app.disable('x-powered-by')
  app.use(cors())
  /*******************************************************/
  // app.use("/api/customer", NewCustomerAPI(customerBLL,authBLL));
  // app.use("/api/product", NewProductAPI(productBLL));
  // app.use("/api/order", NewOrderAPI(orderBLL));
  // app.use("/api/auth",NewAuthAPI(authBLL));
  // app.use("/api/mail",NewMailAPI());
  /*******************************************************/
  // app.use("/", ExpressStaticFallback(config.app.dir));
  // app.use(HttpErrorHandler);
  app.use('/api', router)
  console.log(`listen on ${config.server.port}`)
  app.listen(config.server.port, '0.0.0.0', () => {
    const err = arguments[0]
    if (err) {
      console.log(err)
    }
  })
}
main().catch(err => console.log(err))
