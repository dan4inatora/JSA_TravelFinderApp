const express = require('express');
const envConfig = require('./config/envConfig')
const createConnection = require('typeorm').createConnection;
const app = express();


createConnection().then(async () => {
  console.log('Database connected successfully.')
}, error => {
  console.log('Error creating database connection: ' + error)
});


app.listen(
  {port: envConfig.express.port},
  () => console.log(`App listening on port ${envConfig.express.port} `)
);
