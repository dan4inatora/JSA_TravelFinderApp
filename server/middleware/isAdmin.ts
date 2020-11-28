import {Roles} from '../constants/Roles'

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === Roles.ADMIN) {
    next();
  } else {
    res.status(401).send("User must be Admin");
  }
}

export default isAdmin;