import { userRouter } from './user'
import authRouter from './auth.router'
import { serverErrorHandler } from '../middlewares/serverErrorHandler'
import { Express } from 'express-serve-static-core'

const apiRouter = (app: Express) => {
  app.use('/api/v1/users', userRouter)
  app.use('/api/v1/auth', authRouter)
  app.use(serverErrorHandler)
}

export default apiRouter
