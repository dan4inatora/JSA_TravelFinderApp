import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";

const userService = new UserService();

export const registerController = (req : Request, res : Response, next : NextFunction) => {
  return userService.register(req, res, next);
};

export const loginController = async (req : Request, res : Response, next : NextFunction) => {
  return userService.login(req, res, next);
};


export const currentUserController = async (req : Request, res : Response, next : NextFunction) =>{
  return userService.currentUser(req, res, next);
}

export const logoutController = (req : Request, res : Response, next : NextFunction) => {
  return userService.logout(req, res, next)
};



