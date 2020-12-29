import {loginController, editUserController, deleteUserController, createUserController, getAllUsersController}  from '../controllers/adminControler';
import isAdmin from '../middleware/isAdmin';
import express from 'express';
const router = express.Router();

router.post('/createUser',isAdmin, createUserController);
router.post('/login' ,loginController);
router.post('/deleteUser' , isAdmin, deleteUserController);
router.post('/editUser' , isAdmin, editUserController);
router.get('/getAllUsers' , isAdmin, getAllUsersController);

export default router;