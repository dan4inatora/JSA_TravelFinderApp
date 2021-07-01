import {CommonRoutesConfig} from './CommonRoutesConfig';
import express from 'express';
import favoritesController from '../controllers/FavoritesController';
import AuthenticationMiddleware from '../middleware/AuthenticationMiddleware';

export class FavoritesRouter extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'FavoritesRouter');
    }

    configureRoutes() {
        // (we'll add the actual route configuration here next)
        this.app.route('/getAllFavorites/:id')
            .get(favoritesController.getAllFavorites)
        this.app.route('/addFavorites/:id')
            .post(favoritesController.addFavorite)
        this.app.route('/deleteFavorites/:id/:hotelId')
            .post(favoritesController.deleteFavorite)
        this.app.route('isAddedToFavourites/:id/:hotelId')
            .get(favoritesController.isAddedToFavourites)

        return this.app;
    }
}