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

    public async getHotelById(hotelId: number) : Promise<Hotel> {
        return await Hotel.findOne({where:{id:hotelId}});
    }

    public async createHotel(hotelId: number, name : string, numberReservations : number, ) : Promise<Hotel> {
        let hotel = new Hotel();
        hotel.id = hotelId;
        hotel.name = name;
        hotel.timesReserved = numberReservations;
        return await hotel.save();
    }


   
}

export default HotelService.getInstance();