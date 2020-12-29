import express from 'express';
import {envConfig} from './config/envConfig';
import cors from "cors";
import session from "express-session";
import {RedisStoreWrapper, client} from "./services/RedisService"
import LocalPasport from './config/passportConfig';
import AdminPassport from './config/passportAdminConfig';
import mainRouter from './routers/mainRouter';
const createConnection = require('typeorm').createConnection;

const app = express();

//Redis connection check
const RedisStore = RedisStoreWrapper(session);

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

//Middleware - sessions 
const sessionMiddleware = session({
  name: "travelFinderSession",
  secret: envConfig.express.session.secret,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store: new RedisStore({ client }),
  cookie: { maxAge: 60 * 60 * 60 } // Set to secure:false and expire in 1 minute for demo purposes
})

const passportMiddleware = LocalPasport.initialize();
const passportSessionMiddleware = LocalPasport.session();

app.use(express.json())
.use(sessionMiddleware)
.use(passportMiddleware)
.use(passportSessionMiddleware);

//Global error handler
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach(key =>
      valErrors.push(err.errors[key].message)
    );
    res.send(valErrors);
  } else {
    console.log(err);
  }
});

//CORS FOR PUBLIC
console.log()
app.use(cors({
  methods:["POST"],
  origin:`http://localhost:${envConfig.frontend.port}`,
  credentials: true
}));

app.use('/', mainRouter);

//App and port
app.listen(
  {port: envConfig.express.public.port},
  (): void => console.log(`Public is now running on http://localhost:${envConfig.express.public.port}`));


//ADMIN APP
const adminApp = express();
const passportMiddlewareAdmin = AdminPassport.initialize();
const passportSessionMiddlewareAdmin = AdminPassport.session();

adminApp.use(express.json())
.use(sessionMiddleware)
.use(passportMiddlewareAdmin)
.use(passportSessionMiddlewareAdmin);

//global error handler
adminApp.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach(key =>
      valErrors.push(err.errors[key].message)
    );
    res.send(valErrors);
  } else {
    console.log(err);
  }
});

adminApp.use(cors({
  methods:["POST"],
  origin:`http://localhost:${envConfig.frontendAdmin.port}`,
  credentials: true
}));

//AdminApp and port
adminApp.listen(
  {port: envConfig.express.admin.port},
  (): void => console.log(`Admin is now running on http://localhost:${envConfig.express.admin.port}`));


  

