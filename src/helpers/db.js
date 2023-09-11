import  mongoose from 'mongoose';
import Product from '../models/product.js'
import User from '../models/user.js'
import Role from '../models/role.js'
import Category from '../models/category.js'
import Order from '../models/order.js'
import 'dotenv/config'

let { connect, Promise} = mongoose

connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Data base is connect'))
        .catch(e => console.log("Error: " + e))
Promise = global.Promise;

export default {
        Product,
        User,
        Role,
        Category,
        Order
}