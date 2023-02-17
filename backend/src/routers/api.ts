import { categoryRouter } from './category'
import { usersRouter } from './users'
import authRouter from './auth.router'
import { serverErrorHandler } from '../middlewares/serverErrorHandler'
import { Express } from 'express-serve-static-core'
import { ideaRouter } from './idea'
import { specialEventRouter } from './specialEvent'

const apiRouter = (app: Express) => {
  app.use('/api/v1/users', usersRouter)
  app.use('/api/v1/auth', authRouter)
  app.use('/api/category', categoryRouter)
  app.use('/api/event', specialEventRouter)
  app.use('/api/idea', ideaRouter)
  app.use(serverErrorHandler)
}

export default apiRouter
