import express from 'express';
import { createAccount, login } from '../controllers/auth.controller';


const authRouter = express.Router();

authRouter.post('/create', createAccount);
authRouter.post('/login', login);


export default authRouter;