import { Images } from '../models/Images';
import { _objectWithoutProperties } from '../helperFunctions/deleteObjectKeys';
import { NextFunction, Request, Response } from 'express';
import upload from '../helperFunctions/multerSetUp';
import multer from 'multer';
import ImageService from '../services/ImageService';


class ImageController {

  private static instance: ImageController;

  public static getInstance(): ImageController {
      if (!ImageController.instance) {
        ImageController.instance = new ImageController();
      }

      return ImageController.instance;
  }

  public async uploadImage(req : Request, res : Response, next : NextFunction)  {
    let hotelId = req.params.hotelId;
    // 'profile_pic' is the name of our file input field in the HTML form
    upload.single('profile_pic');

    upload(req, res, async (err) => {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        await ImageService.createImage(hotelId, req.file.path);
        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
  };

  //MAKE GET IMAGES FOR HOTEL
  //MAKE ROUTE

}

export default ImageController.getInstance();









