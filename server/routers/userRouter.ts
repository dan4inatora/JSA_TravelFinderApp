import userController  from '../controllers/userController';
import AuthenticationMiddleware from '../middleware/AuthenticationMiddleware';
import express from 'express';
const router = express.Router();

router.post('/register', userController.register);
router.post('/login' ,userController.login);
router.post('/logout' , AuthenticationMiddleware.isAuthenticated, userController.logout);
router.get('/currentUser' , AuthenticationMiddleware.isAdmin, userController.currentUser);



export default router;