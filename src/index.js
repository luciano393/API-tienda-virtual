import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from '../src/helpers/jwt.js';
import errorHandler from '../src/helpers/error-handler.js';
import userControler from './controllers/user.controler.js'
import productControler from './controllers/product.controler.js'
import emailControler from './controllers/nodemailer.controler.js'
import roleControler from './controllers/role.controler.js'

const { urlencoded, json } = bodyParser
const app = express();


app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/api/users', userControler);
app.use('/api/product', productControler);
app.use('/api/email', emailControler);
app.use('/api/role', roleControler);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || 9000;
const server = app.listen(port, () => { console.log('Server listening on port ' + port)})
