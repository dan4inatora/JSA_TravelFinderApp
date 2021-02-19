import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import passport from "passport";
import  userService  from "../services/UserService";
import { Roles } from "../constants/Roles";
import { _objectWithoutProperties } from "../helperFunctions/deleteObjectKeys";

class UserController {

  private static instance: UserController;

  public static getInstance(): UserController {
      if (!UserController.instance) {
        UserController.instance = new UserController();
      }

      return UserController.instance;
  }

  public async register (req : Request, res : Response, next : NextFunction)  {
    const { email, username, firstname, lastname, password} = req.body;
    const matchedUser = await userService.findUserByEmail(email);
    if(matchedUser){
       res.status(404).send({ error: 'Duplicate email adress' });
    }
    else{
     const user = await userService.createUser(new User(email, username, firstname, lastname, password, Roles.USER));
     console.log("USER", user)
     return res.send(user);
    }
  };
  
  public async login(req : Request, res : Response, next : NextFunction){
    await passport.authenticate(
      "local",
      { session: true },
      async (err, user, info) => {
        if (err) {
          return res.send(err);
        } else if (user) {
          try {
            await req.logIn(user, err => {
              if (err) {
                return next(err);
              }
            });
            return res.send(user);
          } catch (err) {
            return next(err);
          }
        } else {
          return res.status(404).send({ error: 'No such user exists' });;
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
  
  
  public async currentUser(req : Request, res : Response, next : NextFunction){
      if(req.user === undefined){
        return res.status(404).send("User not found");
      }
      const user = await userService.findUserById(req.user.id);
  
      if (!user)
          return res.status(404).send({error : "User not found"});
      else{
          return res.status(200).send(user);
      }
  }
  
  public async logout(req : Request, res : Response, next : NextFunction) {
      req.logout();
      req.session.destroy(function (err) {
        res.send(err); 
      });
      res.clearCookie("travelFinderSession");
  };
  
}

export default UserController.getInstance();




