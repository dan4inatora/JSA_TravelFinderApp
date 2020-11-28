import isAdmin from "./isAdmin";

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("Not authenticated");
  }
}

export default isAuthenticated;