const express = require('express');
const envConfig = require('./config/envConfig')
const createConnection = require('typeorm').createConnection;
const app = express();
const cors = require("cors");
const redis = require("redis");
const passport = require("passport");
const session = require("express-session");
const redisStore = require("connect-redis")(session);
const client = redis.createClient({ host: "localhost", port: 6379 });

//Redis connection check
client.on("error", function(err) {
  console.log("could not establish a connection with redis. " + err);
});

client.on("connect", function() {
  console.log("connected to redis successfully");
});

//Database connection check
createConnection().then(async () => {
  console.log('Database connected successfully.')
}, error => {
  console.log('Error creating database connection: ' + error)
});

//Middleware - sessions and passport
app
  .use(express.json())
  .use(
    "/",
    session({
      name: "_redisDemo",
      secret: envConfig.session.secret,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      store: new redisStore({ client }),
      cookie: { maxAge: 60 * 60 * 60 } // Set to secure:false and expire in 1 minute for demo purposes
    })
  )
  .use(passport.initialize())
  .use(passport.session());

app.use(cors({
  methods:["POST"],
  origin:"http://localhost:5000",
  credentials: true
}));

//App and port
app.listen(
  {port: envConfig.express.port},
  () => console.log(`App listening on port ${envConfig.express.port} `)
);
