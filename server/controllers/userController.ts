import { UserService } from "../services/UserService";

const userService = new UserService();

export const registerController = (req, res, next) => {
  return userService.register(req, res, next);
};

export const loginController = async (req, res, next) => {
  return userService.login(req, res, next);
};


export const currentUserController = async (req, res, next) =>{
  return userService.currentUser(req, res, next);
}

export const logoutController = (req, res, next) => {
  return userService.logout(req, res, next)
};



