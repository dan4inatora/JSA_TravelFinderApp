import {login, createUser, editUser, getAllUsers, deleteUser} from '../services/AdminService';

export const loginController = (req, res, next) => {
  login(req, res, next);
};

export const editUserController = async (req, res, next) => {
  editUser(req, res, next);
};

export const createUserController = async (req, res, next) =>{
  createUser(req, res, next);
}

export const deleteUserController = (req, res, next) => {
  deleteUser(req, res, next)
};

export const getAllUsersController = (req, res, next) => {
  getAllUsers(req, res, next)
};







