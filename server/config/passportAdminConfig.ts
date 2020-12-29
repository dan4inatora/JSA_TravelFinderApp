import passport from "passport";
import { User } from '../models/User';
import strategy from "passport-local";
import {Roles} from '../constants/Roles';


const localStrategy = strategy.Strategy;
const AdminPassport = new passport.Passport();


AdminPassport.serializeUser((user: User, done) => {
  done(null, user.id);
});

AdminPassport.deserializeUser(async (id: number, done) => {
  const user = await User.findOne({where:{id}});
  done(null, user);
});


AdminPassport.use(
  "local-admin",
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try{
        const matchingUser = await User.findOne({where:{email}});
        if(!matchingUser){
          return done(null, false, {message : "Email not registered"});
        }
        else if(matchingUser.role !== Roles.ADMIN){
          return done(null, false, {message:"User is neither admin, nor superadmin"});
        }
        else if(!matchingUser.comparePassword(password)){
          return done(null, false, {message:"Incorrect password"});
        }
        else{
          done(null, matchingUser);
        }
      }
      catch(error){
        done(error);
      }  
    }
  )
);

export default AdminPassport;