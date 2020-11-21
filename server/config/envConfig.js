require('dotenv').config();

module.exports = {
  express : {
    port: process.env.PORT
  },
  session : {
    secret: process.env.SESH_SECRET
  }
};