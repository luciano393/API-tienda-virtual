import  mongoose from 'mongoose';
import productModel from '../models/product.js'
import userModel from '../models/user.js'
import env from 'dotenv'
env.config()

let { connect, Promise} = mongoose

connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Data base is connect'))
        .catch(e => console.log("Error: " + e))
Promise = global.Promise;

export const Product = productModel.default;
export const User = userModel.default;