import { _objectWithoutProperties } from "../helperFunctions/deleteObjectKeys";
import { DeleteResult } from "typeorm";
import hotelService from "./HotelService";
import { Ratings } from "../models/Ratings";


class RatingsService {

    private static instance: RatingsService;

    public static getInstance(): RatingsService {
        if (!RatingsService.instance) {
            RatingsService.instance = new RatingsService();
        }

        return RatingsService.instance;
    }

    public async addRating(userId : number, hotelIdentifier: string, rating: number) : Promise<Ratings>{
        let hotel = await hotelService.getHotelById(hotelIdentifier);

        if(hotel === undefined){
            hotel = await hotelService.createHotel(hotelIdentifier);
        }
        let newRating = new Ratings();
        newRating.hotelId = hotel.id;
        newRating.userId = userId;
        newRating.rating = rating;
        return await Ratings.create(newRating).save();
        
    }

    public async deleteRating(userId : number, hotelIdentifier: string) : Promise<DeleteResult>{
        let hotel = await hotelService.getHotelById(hotelIdentifier);

        let toBeDeleted = await Ratings.findOne({where:{userId, hotelId: hotel.id}});
        return await Ratings.delete(toBeDeleted);
    }

    public async getUserRatingforHotel(userId : number, hotelIdentifier: string) : Promise<Ratings>{
        let hotel = await hotelService.getHotelById(hotelIdentifier);
        let rating = await Ratings.findOne({where:{userId, hotelId: hotel.id}});
        return rating ? rating : null; 
    }

    public async getAllRatingsForHotel( hotelIdentifier: string) : Promise<Ratings[]>{
        let hotel = await hotelService.getHotelById(hotelIdentifier);

        return await Ratings.find({where:{hotelId: hotel.id}})
    }


}

export default RatingsService.getInstance();