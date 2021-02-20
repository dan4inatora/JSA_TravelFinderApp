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

    public async addRating(userId : number, hotelId: number, hotelName: string, rating: number) : Promise<Ratings>{
        if((await hotelService.getHotelById(hotelId)) === undefined){
            await hotelService.createHotel(hotelId, hotelName, 0)
        }
        let newRating = new Ratings();
        newRating.hotelId = hotelId;
        newRating.userId = userId;
        newRating.rating = rating;
        return await newRating.save();
        
    }

    public async deleteRating(userId : number, hotelId: number) : Promise<DeleteResult>{
        let toBeDeleted = await Ratings.findOne({where:{userId, hotelId}});
        return await Ratings.delete(toBeDeleted);
    }

    public async getUserRatingforHotel(userId : number, hotelId: number) : Promise<Ratings>{
        return await Ratings.findOne({where:{userId, hotelId}})
    }

    public async getAllRatingsForHotel( hotelId: number) : Promise<Ratings[]>{
        return await Ratings.find({where:{hotelId}})
    }


}

export default RatingsService.getInstance();