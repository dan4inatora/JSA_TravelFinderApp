import {register, login, currentUser, logout} from '../services/UserService';

export const registerController = (req, res, next) => {
  register(req, res, next);
};

export const loginController = async (req, res, next) => {
  login(req, res, next);
};


export const currentUserController = async (req, res, next) =>{
  currentUser(req, res, next);
}

export const logoutController = (req, res, next) => {
  logout(req, res, next)
};



