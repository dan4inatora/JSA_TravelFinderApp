import {CommonRoutesConfig} from './CommonRoutesConfig';
import express from 'express';
import adminController from '../controllers/adminControler';
import AuthenticationMiddleware from '../middleware/AuthenticationMiddleware';
import userController from '../controllers/userController';

export class AdminRouter extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AdminRoutes');
    }

    configureRoutes() {
        // (we'll add the actual route configuration here next)
        this.app.route('/createUser')
            .post(adminController.createUser)
        this.app.route('/login')
            .post(adminController.login)
        this.app.route('/logout')
            .post(AuthenticationMiddleware.isAuthenticated,
                  userController.logout)
        this.app.route('/deleteUser')
            .delete(AuthenticationMiddleware.isAdmin, 
                    adminController.deleteUser)
        this.app.route('/editUser')
            .put(AuthenticationMiddleware.isAdmin, 
                 adminController.editUser)
        this.app.route('/getAllUsers')
            .get(AuthenticationMiddleware.isAdmin, 
                 adminController.getAllUsers)
                 
        return this.app;
    }
}