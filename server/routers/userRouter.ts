import {loginController, registerController, currentUserController, logoutController}  from '../controllers/userController';
import isAuthenticated from '../middleware/isAuthenticated';
import express from 'express';
const router = express.Router();

router.post('/register', registerController);
router.post('/login' ,loginController);
router.post('/logout' , isAuthenticated, logoutController);
router.get('/currentUser' , isAuthenticated, currentUserController);



export default router;