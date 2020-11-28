import passport from "passport";
import { User } from '../models/User';
import strategy from "passport-local";

const localStrategy = strategy.Strategy;

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  const user = await User.findOne({where:{id}});
  done(null, user);
});


passport.use(
  "local",
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try{
        const matchingUser = await User.findOne({where:{email}});
        if(!matchingUser){
          return done(null, false, {message : "Email not registered"});
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

export default passport;