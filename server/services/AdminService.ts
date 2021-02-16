import { Roles } from "../constants/Roles";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { User } from "../models/User";
import  userService  from "./UserService";
import { _objectWithoutProperties } from "../helperFunctions/deleteObjectKeys";
import { DeleteResult } from "typeorm";


class AdminService {

    private static instance: AdminService;

    public static getInstance(): AdminService {
        if (!AdminService.instance) {
            AdminService.instance = new AdminService();
        }

        return AdminService.instance;
    }

    public async getAllUsers() : Promise<User[]> {
        return await User.find();
    }

    public async deleteUser(id : number) : Promise<DeleteResult>{
        return await User.delete({id});    
    }
}

export default AdminService.getInstance();