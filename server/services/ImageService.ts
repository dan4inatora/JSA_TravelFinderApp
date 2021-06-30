import { Roles } from "../constants/Roles";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { User } from "../models/User";
import  userService  from "./UserService";
import { _objectWithoutProperties } from "../helperFunctions/deleteObjectKeys";
import { DeleteResult } from "typeorm";
import { Images } from "../models/Images";


class ImageService {

    private static instance: ImageService;

    public static getInstance(): ImageService {
        if (!ImageService.instance) {
            ImageService.instance = new ImageService();
        }

        return ImageService.instance;
    }

    public async createImage(hotelId: string, imagePath: string) : Promise<Images> {
        let image = new Images();
        image.hotelId = hotelId;
        image.imagePath = imagePath;
        return await Images.create(image).save();
    }

}

export default ImageService.getInstance();