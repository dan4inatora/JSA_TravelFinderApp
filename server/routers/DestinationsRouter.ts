import {CommonRoutesConfig} from './CommonRoutesConfig';
import express from 'express';
import destinationController from '../controllers/DestinationController';
import AuthenticationMiddleware from '../middleware/AuthenticationMiddleware';

export class DestinationRouter extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'DestinationRouter');
    }
z
    configureRoutes() {
        // (we'll add the actual route configuration here next)

        this.app.route('/getHotelById/:lat/:lng/:hotelId')
            .get(destinationController.getHotelById)
        this.app.route('/getHotels/:lat/:lng/:budgetValue/:dateRange')
            .get(destinationController.getHotels)
        this.app.route('/getPointOfInterest/:lat/:lng')
            .get(destinationController.getPointOfInterest)
        this.app.route('/getRecommendations/:code')
            .get(destinationController.getRecommendations)
        this.app.route('/getToursAndActivities/:lat/:lng')
            .get(destinationController.getToursAndActivities)
        
   
        return this.app;
    }
}