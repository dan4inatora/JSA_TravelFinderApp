import { NextFunction, Request, Response } from 'express';
import { AdminService } from '../services/AdminService';

const adminService = new AdminService();


export const loginController = (req : Request, res : Response, next : NextFunction) => {
  return adminService.login(req, res, next);
};

export const editUserController = async (req : Request, res : Response, next : NextFunction) => {
  return adminService.editUser(req, res, next);
};

export const createUserController = async (req : Request, res : Response, next : NextFunction) =>{
  return adminService.createUser(req, res, next);
}

export const deleteUserController = (req : Request, res : Response, next : NextFunction) => {
  return adminService.deleteUser(req, res, next)
};

export const getAllUsersController = (req : Request, res : Response, next : NextFunction) => {
  return adminService.getAllUsers(req, res, next)
};







