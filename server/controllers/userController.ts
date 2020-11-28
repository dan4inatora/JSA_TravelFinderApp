import {User} from '../models/User';
import passport from 'passport';
import register from '../services/registerService';

export const registerUser = (req, res, next) => {
  register(req, res, next);
};

export const login = async (req, res, next) => {
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
        return res.send("No such user");
      }
    }
  )(req, res, next);
};


export const currentUser = async (req, res, next) =>{
  if(req.user === undefined){
    return res.status(404).send("User not found");
  }
  const user = await User.findOne({where:{id: req.user.id}});

  if (!user)
      return res.status(404).send("User not found");
  else{
      return res.status(200).send(user);
  }
}


export const logout = (req, res, next) => {
  req.logout();
  req.session.destroy(function (err) {
    res.send(err); //Inside a callback… bulletproof!
  });
  res.clearCookie("travelFinderSession");
};



