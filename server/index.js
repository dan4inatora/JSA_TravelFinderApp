const express = require('express');
const envConfig = require('./config/envConfig')

const app = express();


app.listen(
  {port: envConfig.express.port},
  () => console.log(`App listening on port ${envConfig.express.port} `)
);
