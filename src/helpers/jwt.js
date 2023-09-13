import expressJwt from 'express-jwt';
import userServices  from '../services/user.js';
import 'dotenv/config'


export default jwt;

const { getById } = userServices

function jwt() {
    const secret = process.env.SECRET
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            '/api/user/authenticate',
            '/api/user/register',
            '/api/product',
            '/api/email/send'
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