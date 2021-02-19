import {CommonRoutesConfig} from './CommonRoutesConfig';
import express from 'express';
import ratingsController from '../controllers/RatingsController';
import AuthenticationMiddleware from '../middleware/AuthenticationMiddleware';

export class RatingsRouter extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'RatingsRouter');
    }

    configureRoutes() {
        // (we'll add the actual route configuration here next)
        this.app.route('/getAverageRating/:id')
            .get(AuthenticationMiddleware.isAuthenticated,
                ratingsController.getAllRatingsForHotel)
        this.app.route('/addRating/:id')
            .post(AuthenticationMiddleware.isAuthenticated,
                ratingsController.addRating)
        this.app.route('/deleteRating/:id/:hotelId')
            .delete(AuthenticationMiddleware.isAuthenticated,
                ratingsController.deleteRating)
        this.app.route('/getUserRating/:id/:hotelId')
            .get(AuthenticationMiddleware.isAuthenticated,
                ratingsController.getUserRatingForHotel)


        return this.app;
    }
}