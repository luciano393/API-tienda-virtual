const mongoose = require('mongoose');
const config = require('../../config.json')


mongoose.connect(config.db_uri, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Data base is connect'))
        .catch(e => console.log("Error: " + e))
mongoose.Promise = global.Promise;


module.exports = {
    Product: require('../models/product'),
    User: require('../models/user')
};