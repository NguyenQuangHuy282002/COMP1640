import { categoryRouter } from './category.router'
import { usersRouter } from './users.router'
import authRouter from './auth.router'
import { serverErrorHandler } from '../middlewares/serverErrorHandler'
import { Express } from 'express-serve-static-core'
import { ideaRouter } from './idea.router'
import { specialEventRouter } from './specialEvent.router'
import { departmentRouter } from './department.router'
import { commentRouter } from './comment.router'

const apiRouter = (app: Express) => {
  app.use('/api/v1/users', usersRouter)
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/category', categoryRouter)
  app.use('/api/v1/department', departmentRouter)
  app.use('/api/v1/event', specialEventRouter)
  app.use('/api/v1/idea', ideaRouter)
  app.use('/api/v1/comment', commentRouter)
  app.use(serverErrorHandler)
}

export default apiRouter
