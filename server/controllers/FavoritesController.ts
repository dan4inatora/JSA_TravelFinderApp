import { NextFunction, Request, Response } from "express";
import favoritesService from '../services/FavoritesService';
import { _objectWithoutProperties } from "../helperFunctions/deleteObjectKeys";

class FavoritesController {

  private static instance: FavoritesController;

  public static getInstance(): FavoritesController {
      if (!FavoritesController.instance) {
        FavoritesController.instance = new FavoritesController();
      }

      return FavoritesController.instance;
  }

  public async getAllFavorites (req : Request, res : Response, next : NextFunction)  {
    let userId = parseInt(req.params.id);
    let favorites = await favoritesService.getAllFavorites(userId);
    res.status(200).send(favorites);
  };

  public async addFavorite (req : Request, res : Response, next : NextFunction)  {
    let userId = parseInt(req.params.id);
    const {hotelId, hotelName} = req.body;
    let addedFavorite = await favoritesService.addFavorites(userId, hotelId, hotelName);
    res.status(200).send(addedFavorite);
  };

  public async deleteFavorite (req : Request, res : Response, next : NextFunction)  {
    let userId = parseInt(req.params.id);
    let hotelId = parseInt(req.params.hotelId);
    let deleted = await favoritesService.deleteFavorites(userId, hotelId);
    res.status(200).send(deleted);
  }; 

  public async isAddedToFavourites (req : Request, res : Response, next : NextFunction) {
    let userId = parseInt(req.params.id);
    let hotelId = parseInt(req.params.hotelId);
    let isAdded = await favoritesService.isAddedToFavourites(userId, hotelId);
  }
  
  
}

export default FavoritesController.getInstance();




