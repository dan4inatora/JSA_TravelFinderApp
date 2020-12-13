
import {User} from '../models/User';
import {Roles} from '../constants/Roles'
import passport from 'passport';

export async function register(req, res, next){  
   const { email, username, firstname, lastname, password} = req.body;
   const matchedUser = await User.findOne({where:{email}})
   if(matchedUser){
      res.status(404).send({ error: 'Duplicate email adress' });
   }
   else{
    const userDto = new User();
    userDto.email = email;
    userDto.username = username;
    userDto.firstName = firstname;
    userDto.lastName = lastname;
    userDto.password = password;
    userDto.role = Roles.USER;
    const user = await User.create({...userDto}).save();
    console.log("USER", userDto, user)
    return res.send(user);
   }

}

export async function login(req, res, next) {
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
}

export async function currentUser(req, res, next) {
  if(req.user === undefined){
    return res.status(404).send("User not found");
  }
  const user = await User.findOne({where:{id: req.user.id}});

  if (!user)
      return res.status(404).send({error : "User not found"});
  else{
      return res.status(200).send(user);
  }
}

export async function logout(req, res, next) {
  req.logout();
  req.session.destroy(function (err) {
    res.send(err); //Inside a callback… bulletproof!
  });
  res.clearCookie("travelFinderSession");
}