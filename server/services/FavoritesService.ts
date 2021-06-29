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
        .leftJoin('favorites.hotel', 'hotel')
        .select(['hotel'])
        .getRawMany();
        
        return hotels;
    }

    public async deleteFavorites(userId : number, hotelId: string) : Promise<DeleteResult>{
        let fav = await Favorites.findOne({where:{userId, hotelId}});  
        return await Favorites.delete(fav);  
    }

    public async addFavorites(userId : number, hotelId: string) : Promise<Favorites>{
        if((await hotelService.getHotelById(hotelId)) === undefined){
            await hotelService.createHotel(hotelId)
        }
        let fav = new Favorites();
        fav.userId = userId;
        return await Favorites.create(fav).save();    
    }

    public async isAddedToFavourites(userId : number, hotelId: string): Promise<boolean> {
        const isAdded = await Favorites.findOne({where:{userId, hotelId}});
        if(isAdded) {
            return true;
        } else {
            return false;
        }
    }
}

export default FavoritesService.getInstance();