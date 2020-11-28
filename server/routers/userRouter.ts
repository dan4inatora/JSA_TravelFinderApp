import {login, registerUser, currentUser, logout}  from '../controllers/userController';
import isAuthenticated from '../middleware/isAuthenticated';
import express from 'express';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login' ,login);
router.post('/logout' , isAuthenticated, logout);
router.get('/currentUser' , isAuthenticated, currentUser);



export default router;