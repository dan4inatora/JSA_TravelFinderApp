import express from 'express';
import userRouter from './userRouter';
import adminRouter from './adminRouter'
const mainRouter = express.Router();

mainRouter.use('/api', userRouter);
mainRouter.use('/api', adminRouter);

export default mainRouter;