import { Roles } from "../constants/Roles";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { User } from "../models/User";
import  userService  from "./UserService";
import { _objectWithoutProperties } from "../helperFunctions/deleteObjectKeys";
import { DeleteResult } from "typeorm";
import hotelService from "./HotelService";
import { Images } from "../models/Images";


class ImageService {

    private static instance: ImageService;

    public static getInstance(): ImageService {
        if (!ImageService.instance) {
            ImageService.instance = new ImageService();
        }

        return ImageService.instance;
    }

    public async createImage(hotelIdentifier: string, imagePath: string) : Promise<Images> {
        let hotel = await hotelService.getHotelById(hotelIdentifier);

        if(hotel === undefined){
            hotel = await hotelService.createHotel(hotelIdentifier);
        }

        let image = new Images();
        image.hotelId = hotel.id;
        image.imagePath = imagePath;
        return await Images.create(image).save();
    }

}

export default ImageService.getInstance();