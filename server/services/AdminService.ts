import { Roles } from "../constants/Roles";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { User } from "../models/User";
import { UserService } from "./UserService";
import { _objectWithoutProperties } from "../helperFunctions/deleteObjectKeys";

const userService = new UserService();

export class AdminService {

    private static instance: AdminService;

    public static getInstance(): AdminService {
        if (!AdminService.instance) {
            AdminService.instance = new AdminService();
        }

        return AdminService.instance;
    }

    public async login(req : Request, res : Response, next : NextFunction) {
        await passport.authenticate(
          "local-admin",
          { session: true },
          async (err, user, info) => {
            if (err) {
              return res.send(err);
            } else if (user) {
              try {
                if(user.role !== Roles.ADMIN){
                   return res.status(404).send({ error: 'User is not admin' });
                }
                else{
                  await req.logIn(user, err => {
                    if (err) {
                      return next(err);
                    }
                  });
                  return res.send(user);
                }
              } catch (err) {
                return next(err);
              }
            } else {
              return res.status(404).send({ error: 'No such user exists' });
            }
          }
        )(req, res, next);
    }

    public async getAllUsers(req : Request, res : Response, next : NextFunction) {
        const users = await User.find();
        if(!users){
          return res.status(404).send(0);
        }
        return res.status(200).send(users);
    }

    public async createUser(req : Request, res : Response, next : NextFunction) {
        return userService.register(req, res, next)
    }

    public async deleteUser(req : Request, res : Response, next : NextFunction) {
        const {id} = req.body;
        const user = await User.delete({id});
        return res.status(200).send(user);
    }

    public async editUser(req : Request, res : Response, next : NextFunction) {
        const {id} = req.body
        let body_without_id = _objectWithoutProperties(req.body, ["id"]);
        const user = await User.update({id}, {...body_without_id});
        if(user.affected > 0)
            return await User.findOne(id);
        else
            res.status(401).send({error:"Error while updating user"})
      }
}