const jwt = require('jsonwebtoken')
const config = require('./config')
const secretKey = config.Secret

const checkToken = (req, res, next) => {
if (typeof req.headers['authorization'] === 'undefined'){
    return res.sendStatus(401)
}

    let token = req.headers['authorization']

    if(token.startsWith('Bearer ')) {
        bearer = token.split(' ')
        token = bearer[1]
    }
    if(token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if(err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        res.json({
            success: false,
            message: 'Auth token is not supplied'
        })
    }
}

module.exports = checkToken