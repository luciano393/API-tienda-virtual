import expressJwt from 'express-jwt';
import userServices  from '../services/user.js';
import env from 'dotenv'
env.config()

export default jwt;

const { getById } = userServices

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
    const user = await getById(payload.sub);

    // revoke token if user no longer exists
    if(!user) {
        return done(null, true);
    }

    done()
}