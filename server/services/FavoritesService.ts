import { User } from "../models/User";
import { _objectWithoutProperties } from "../helperFunctions/deleteObjectKeys";
import { DeleteResult, getRepository } from "typeorm";
import { Hotel } from "../models/Hotel";
import { Favorites } from "../models/Favorites";
import hotelService from "./HotelService";


class FavoritesService {

    private static instance: FavoritesService;

    public static getInstance(): FavoritesService {
        if (!FavoritesService.instance) {
            FavoritesService.instance = new FavoritesService();
        }

        return FavoritesService.instance;
    }

    public async getAllFavorites(userId: number) : Promise<Favorites[]> {
        let hotels : Favorites[] = await getRepository(Favorites)
        .createQueryBuilder("favorites")
        .where('favorites.userId = :userId', {userId})
        .innerJoin('favorites.hotel', 'hotel')
        .select(['hotel'])
        .getMany();
        
        return hotels;
    }

    public async deleteFavorites(userId : number, hotelIdentifier: string) : Promise<DeleteResult>{
        let hotel = await hotelService.getHotelById(hotelIdentifier);

        let fav = await Favorites.findOne({where:{userId, hotelId: hotel.id}});  
        return await Favorites.delete(fav);  
    }

    public async addFavorites(userId : number, hotelIdentifier: string) : Promise<Favorites>{
        let hotel = await hotelService.getHotelById(hotelIdentifier);

        if(hotel === undefined){
            hotel = await hotelService.createHotel(hotelIdentifier)
        }
        let fav = new Favorites();
        fav.hotelId = hotel.id;
        fav.userId = userId;
        return await Favorites.create(fav).save();    
    }

    public async isAddedToFavourites(userId : number, hotelIdentifier: string): Promise<boolean> {
        let hotel = await hotelService.getHotelById(hotelIdentifier);

        if(hotel === undefined){
            hotel = await hotelService.createHotel(hotelIdentifier)
        }
        const isAdded = await Favorites.findOne({where:{userId, hotelId: hotel.id}});
        if(isAdded) {
            return true;
        } else {
            return false;
        }
    }
}

export default FavoritesService.getInstance();