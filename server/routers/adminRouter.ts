import adminController  from '../controllers/adminControler';
import AuthenticationMiddleware from '../middleware/AuthenticationMiddleware'
import express from 'express';
const router = express.Router();

router.post('/createUser',AuthenticationMiddleware.isAdmin, adminController.createUser);
router.post('/login' ,adminController.login);
router.post('/deleteUser' , AuthenticationMiddleware.isAdmin, adminController.deleteUser);
router.put('/editUser' , AuthenticationMiddleware.isAdmin, adminController.editUser);
router.get('/getAllUsers' , AuthenticationMiddleware.isAdmin, adminController.getAllUsers);

export default router;