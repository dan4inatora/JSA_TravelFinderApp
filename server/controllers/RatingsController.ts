import { NextFunction, Request, Response } from "express";
import ratingsService from '../services/RatingsService';
import { _objectWithoutProperties } from "../helperFunctions/deleteObjectKeys";

class RatingsController {

  private static instance: RatingsController;

  public static getInstance(): RatingsController {
      if (!RatingsController.instance) {
        RatingsController.instance = new RatingsController();
      }

      return RatingsController.instance;
  }

  public async getAllRatingsForHotel (req : Request, res : Response, next : NextFunction)  {
    let hotelId = parseInt(req.params.id);
    let allRatings = await ratingsService.getAllRatingsForHotel(hotelId);
    console.log(allRatings);
    let count = 0;
    let sum = 0;
    for(let i = 0; i < allRatings.length; i++){
        count++;
        sum += allRatings[i].rating;
    }
    let result =  Math.floor(sum / count);

    res.status(200).send(result + "");

  };

  public async addRating (req : Request, res : Response, next : NextFunction)  {
    let userId = parseInt(req.params.id);
    const {hotelId, hotelName, rating} = req.body;
    let addedRating = await ratingsService.addRating(userId,hotelId,hotelName,rating);
    res.status(200).send(addedRating);
  };

  public async deleteRating (req : Request, res : Response, next : NextFunction)  {
    let userId = parseInt(req.params.id);
    let hotelId = parseInt(req.params.hotelId);
    let deleted = await ratingsService.deleteRating(userId, hotelId);
    res.status(200).send(deleted);
  }; 

  public async getUserRatingForHotel (req : Request, res : Response, next : NextFunction)  {
    let userId = parseInt(req.params.id);
    let hotelId = parseInt(req.params.hotelId);
    let rating = await ratingsService.getUserRatingforHotel(userId, hotelId);
    res.status(200).send(rating);
  }; 

  
  
  
}

export default RatingsController.getInstance();




