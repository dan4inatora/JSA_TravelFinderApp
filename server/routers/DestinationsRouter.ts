import {CommonRoutesConfig} from './CommonRoutesConfig';
import express from 'express';
import destinationController from '../controllers/DestinationController';
import AuthenticationMiddleware from '../middleware/AuthenticationMiddleware';

export class DestinationRouter extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'DestinationRouter');
    }

    configureRoutes() {
        // (we'll add the actual route configuration here next)

        this.app.route('/getHotelById')
            .get(AuthenticationMiddleware.isAuthenticated,
                 destinationController.getHotelById)
        this.app.route('/getHotels')
            .get(AuthenticationMiddleware.isAuthenticated,
                destinationController.getHotels)
        this.app.route('/getPointOfInterest')
            .get(AuthenticationMiddleware.isAuthenticated,
                destinationController.getPointOfInterest)
        this.app.route('/getRecommendations')
            .get(AuthenticationMiddleware.isAuthenticated,
                destinationController.getRecommendations)
        this.app.route('/getToursAndActivities')
            .get(AuthenticationMiddleware.isAuthenticated,
                destinationController.getToursAndActivities)
        
   
        return this.app;
    }
}