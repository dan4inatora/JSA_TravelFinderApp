import {CommonRoutesConfig} from './CommonRoutesConfig';
import express from 'express';
import userController from '../controllers/userController';
import AuthenticationMiddleware from '../middleware/AuthenticationMiddleware';

export class UsersRouter extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes() {
        // (we'll add the actual route configuration here next)
        this.app.route('/register')
            .post(userController.register)
        this.app.route('/login')
            .post(userController.login)
        this.app.route('/logout')
            .post(AuthenticationMiddleware.isAuthenticated,
                  userController.logout)
        this.app.route('/currentUser')
            .get(AuthenticationMiddleware.isAuthenticated,
                  userController.currentUser)

        return this.app;
    }
}