import { Roles } from '../constants/Roles';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import  adminService  from "../services/AdminService";
import { _objectWithoutProperties } from '../helperFunctions/deleteObjectKeys';
import  userService  from "../services/UserService";
import { User } from '../models/User';

class AdminController {

  private static instance: AdminController;

  public static getInstance(): AdminController {
      if (!AdminController.instance) {
        AdminController.instance = new AdminController();
      }

      return AdminController.instance;
  }

  public async login (req : Request, res : Response, next : NextFunction) {
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
            console.log("HERE MANIAC?")
            return next(err);
          }
        } else {
          return res.status(404).send({ error: 'No such user exists' });
        }
      }
    )(req, res, next);
  };
  
  public async editUser (req : Request, res : Response, next : NextFunction) {
    const {id} = req.body
    let body_without_id = _objectWithoutProperties(req.body, ["id"]);
    const user = await User.update({id}, {...body_without_id});
    if(user.affected > 0)
        return await userService.findUserById(id);
    else
        res.status(401).send({error:"Error while updating user"})
  };
  
  public async createUser (req : Request, res : Response, next : NextFunction) {
    const { email, username, firstname, lastname, password,role} = req.body;
    const matchedUser = await userService.findUserByEmail(email);
    if(matchedUser){
       res.status(404).send({ error: 'Duplicate email adress' });
    }
    else{
     const user = await userService.createUser(new User(email, username, firstname, lastname, password, role));
     console.log("USER", user)
     return res.send(user);
    }
  }
  
  public async deleteUser (req : Request, res : Response, next : NextFunction) {
    const {id} = req.body;
    const deleteResponce = adminService.deleteUser(id)
    return res.status(200).send(deleteResponce);
  };
  
  public async getAllUsers (req : Request, res : Response, next : NextFunction) {
    const users = await adminService.getAllUsers()
    if(!users){
      return res.status(404).send(0);
    }
    return res.status(200).send(users);
  };
}

export default AdminController.getInstance();









