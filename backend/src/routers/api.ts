import { userRouter } from './user'
import authRouter from './auth.router';

const apiRouter = (app) => {
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/auth', authRouter);
}

export default apiRouter;
