import { Hotel } from "../models/Hotel";
import { _objectWithoutProperties } from "../helperFunctions/deleteObjectKeys";
import { Comment } from "../models/Comment";


class HotelService {

    private static instance: HotelService;

    public static getInstance(): HotelService {
        if (!HotelService.instance) {
            HotelService.instance = new HotelService();
        }

        return HotelService.instance;
    }

    public async getHotelById(hotelIdentifier: string) : Promise<Hotel> {
        return await Hotel.findOne({where:{hotelIdentifier}});
    }

    public async createHotel(hotelIdentifier: string) : Promise<Hotel> {
        let hotel = new Hotel();
        hotel.hotelIdentifier = hotelIdentifier;
        await hotel.save();
        return hotel;
    }


   
}

export default HotelService.getInstance();