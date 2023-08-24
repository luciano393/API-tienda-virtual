const jwt = require('jsonwebtoken')
require('dotenv').config()

const IsAuthenticated = (req, res, next) => {
    const token = req.headers.Authorization
    if (!token) {
        res.status(401).send({
            ok: false,
            message: 'Token Invalido'
        })
    } else {

        jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, data) {
            if (err) {
                return res.status(401).send({
                    ok: false,
                    message: 'Token Invalido'
                });
            } else {
                req.user = data
                next()
            }
        })
    }
}

module.exports = IsAuthenticated;