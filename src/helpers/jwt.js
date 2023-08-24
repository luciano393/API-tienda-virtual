const expressJwt = require('express-jwt');
const userService = require('../services/user');
require('dotenv').config()

module.exports = jwt;

function jwt() {
    const secret = process.env.SECRET
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            '/users/authenticate',
            '/users/register',
            '/product',
            '/email/send'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if(!user) {
        return done(null, true);
    }

    done()
}