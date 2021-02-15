import { AdminService } from '../services/AdminService';

const adminService = new AdminService();


export const loginController = (req, res, next) => {
  return adminService.login(req, res, next);
};

export const editUserController = async (req, res, next) => {
  return adminService.editUser(req, res, next);
};

export const createUserController = async (req, res, next) =>{
  return adminService.createUser(req, res, next);
}

export const deleteUserController = (req, res, next) => {
  return adminService.deleteUser(req, res, next)
};

export const getAllUsersController = (req, res, next) => {
  return adminService.getAllUsers(req, res, next)
};







