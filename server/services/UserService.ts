import { Roles } from "../constants/Roles";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import passport from "passport";

export class UserService {

    private static instance: UserService;

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }

        return UserService.instance;
    }

    public async register(req : Request, res : Response, next : NextFunction){  
        const { email, username, firstname, lastname, password} = req.body;
        const matchedUser = await User.findOne({where:{email}})
        if(matchedUser){
           res.status(404).send({ error: 'Duplicate email adress' });
        }
        else{
         const userDto = new User();
         userDto.email = email;
         userDto.username = username;
         userDto.firstName = firstname;
         userDto.lastName = lastname;
         userDto.password = password;
         userDto.role = Roles.USER;
         const user = await User.create({...userDto}).save();
         console.log("USER", userDto, user)
         return res.send(user);
        }
     
     }

    public async  login(req : Request, res : Response, next : NextFunction) {
        await passport.authenticate(
          "local",
          { session: true },
          async (err, user, info) => {
            if (err) {
              return res.send(err);
            } else if (user) {
              try {
                await req.logIn(user, err => {
                  if (err) {
                    return next(err);
                  }
                });
                return res.send(user);
              } catch (err) {
                return next(err);
              }
            } else {
              return res.status(404).send({ error: 'No such user exists' });;
            }
          }
        )(req, res, next);
    }

    public async currentUser(req : Request, res : Response, next : NextFunction) {
        if(req.user === undefined){
          return res.status(404).send("User not found");
        }
        const user = await User.findOne({where:{id: req.user.id}});
      
        if (!user)
            return res.status(404).send({error : "User not found"});
        else{
            return res.status(200).send(user);
        }
    }

    public async logout(req : Request, res : Response, next : NextFunction) {
        req.logout();
        req.session.destroy(function (err) {
          res.send(err); //Inside a callback… bulletproof!
        });
        res.clearCookie("travelFinderSession");
      }


}