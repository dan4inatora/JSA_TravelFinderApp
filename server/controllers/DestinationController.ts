import { Reacts } from "../constants/Reacts";
import { NextFunction, Request, Response } from "express";
import { use } from "passport";
import CommentService from "../services/CommentService";
import axios from 'axios';
import CommentsService from '../services/CommentService';

class DestinationController {

  private static instance: DestinationController;

  public static getInstance(): DestinationController {
      if (!DestinationController.instance) {
        DestinationController.instance = new DestinationController();
      }

      return DestinationController.instance;
  }

  public async getPointOfInterest(req : Request, res : Response, next : NextFunction)  {
    const {lat, lng} = req.body;    
        axios({
            method: 'GET',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + process.env.REACT_APP_ACCESS_TOKEN},
            url: `https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${lat}&longitude=${lng}`
        }).then((response) => {
            if(response && response.data) {
               res.send(response.data.data);
            }
        }).catch((error) => {
            console.log(error);
            res.send(error);
        }); 
  };

  public async getToursAndActivities(req : Request, res : Response, next : NextFunction)  {
    const {lat, lng} = req.body;   
        axios({
            method: 'GET',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + process.env.REACT_APP_ACCESS_TOKEN},
            url: `https://test.api.amadeus.com/v1/shopping/activities?latitude=${lat}&longitude=${lng}`
        }).then((response) => {
            if(response && response.data) {
                console.log(response);
                res.send(response.data.data);
            }
        }).catch((error) => {
            console.log(error);
            res.send(error)
        });
  };


  public async getHotels(req : Request, res : Response, next : NextFunction)  {
    const {lat, lng, budgetValue, dateRange} = req.body;
    let stringParams='';
    console.log(req.body);
    if(lat) {
        stringParams=`latitude=${lat}&longitude=${lng}`;
    }
    if(budgetValue) {
        stringParams = stringParams+ `&priceRange=${budgetValue[0]}-${budgetValue[1]}`;
    }
    if(dateRange) {
        stringParams = stringParams + `&dateRange=${dateRange}`
    }
    stringParams = stringParams + '&currency=USD';

    console.log('https://test.api.amadeus.com/v2/shopping/hotel-offers?' + stringParams);
    
    axios({
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + process.env.REACT_APP_ACCESS_TOKEN},
        url: 'https://test.api.amadeus.com/v2/shopping/hotel-offers?' + stringParams
    }).then((response) => {
        if(response && response.data) {
            //console.log(response);
            res.send(response.data.data);
        }
    }).catch((error) => {
        //console.log(error);
        res.send(error);
    });

  };

  public async getHotelById(req : Request, res : Response, next : NextFunction)  {
    const {lat, lng, hotelId} = req.body;

        axios({
            method: 'GET',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + process.env.REACT_APP_ACCESS_TOKEN},
            url: `https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?latitude=${lat}&longitude=${lng}&hotelId=${hotelId}`
        }).then((response) => {
            if(response && response.data) {
                console.log(response);
                res.send(response.data.data);
            }
        }).catch((error) => {
            console.log(error);
            res.send(error);
        });

  };

  public async getRecommendations(req : Request, res : Response, next : NextFunction)  {
    const {cityCode} = req.body;
        axios({
            method: 'GET',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + process.env.REACT_APP_ACCESS_TOKEN},
            url: `https://test.api.amadeus.com/v1/reference-data/recommended-locations?cityCodes=${cityCode}`
        }).then((response) => {
            if(response && response.data) {
                console.log(response);
                res.send(response.data.data);
            }
        }).catch((error) => {
            console.log(error);
            res.send(error);
        });

  };

 
 
}

export default DestinationController.getInstance();




