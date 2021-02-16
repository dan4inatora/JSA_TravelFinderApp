import { Roles } from "../constants/Roles";
import { NextFunction, Request, Response } from "express";

class AuthenticationMiddleware {

    private static instance: AuthenticationMiddleware;

    public static getInstance(): AuthenticationMiddleware {
        if (!AuthenticationMiddleware.instance) {
          AuthenticationMiddleware.instance = new AuthenticationMiddleware();
        }

        return AuthenticationMiddleware.instance;
    }

    public async isAdmin(req : Request, res : Response, next : NextFunction){  
        if (req.isAuthenticated() && req.user.role === Roles.ADMIN) {
          next();
        } else {
          res.status(401).send({error: "User must be Admin"});
        }    
      
    }

    public async isAuthenticated(req : Request, res : Response, next : NextFunction){  
      if (req.isAuthenticated()) {
        next();
      } else {
        res.status(401).send("Not authenticated");
      } 
    
  }

}

export default AuthenticationMiddleware.getInstance();