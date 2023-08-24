const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('../src/helpers/jwt');
const errorHandler = require('../src/helpers/error-handler');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./controllers/user.controler'));
app.use('/product', require('./controllers/product.controler'));
app.use('/email', require('./controllers/nodemailer.controler'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || 9000;
const server = app.listen(port, () => { console.log('Server listening on port ' + port)})
