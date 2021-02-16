import { Roles } from "../constants/Roles";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import passport from "passport";

class UserService {

    private static instance: UserService;

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }

        return UserService.instance;
    }

    public async findUserById(id : number) : Promise<User>{
       return await User.findOne({where:{id}});
    }

    public async findUserByEmail(email : string) : Promise<User>{
      return await User.findOne({where:{email}})
    }

    public async createUser(user : User) : Promise<User>{
      return await User.create({...user}).save();
    }

}

export default UserService.getInstance();