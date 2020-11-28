import express from 'express';
import userRouter from './userRouter';
const mainRouter = express.Router();

mainRouter.use('/api', userRouter);

export default mainRouter;