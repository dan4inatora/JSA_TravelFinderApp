
import {User} from '../models/User';
import {Roles} from '../constants/Roles'
import passport from 'passport';
import {register} from './UserService'
import {_objectWithoutProperties} from '../helperFunctions/deleteObjectKeys';


export async function login(req, res, next) {
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
          return next(err);
        }
      } else {
        return res.status(404).send({ error: 'No such user exists' });
      }
    }
  )(req, res, next);
}

export async function getAllUsers(req, res, next) {
  const users = await User.find();
  if(!users){
    return res.status(404).send(0);
  }
  return res.status(200).send(users);
}

export async function createUser(req, res, next) {
  register(req, res, next)
}

export async function deleteUser(req, res, next) {
  const {id} = req.body;
  const user = await User.delete({id});
  return res.status(200).send(user);
}

export async function editUser(req, res, next) {
  const {id} = req.body
  var body_without_id = _objectWithoutProperties(req.body, ["id"]);
  const user = await User.update({id}, {...body_without_id});
  if(user.affected > 0)
      return await User.findOne(id);
  else
      res.status(401).send({error:"Error while updating user"})
}