require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Data base is connect'))
        .catch(e => console.log("Error: " + e))
mongoose.Promise = global.Promise;

module.exports = {
    Product: require('../models/product'),
    User: require('../models/user')
};