const JWT = require('jsonwebtoken')

const secret = 'heinrich_key'

module.exports = {
    secret,
    generate: function (value, expires = '7 days') {
        try {
            return JWT.sign(value, secret, { expiresIn: expires })
        } catch (e) {
            console.error('jwt sign error ----> ' + e)
        }
    },
    verify: function (token) {
        try {
            return JWT.verify(token, secret)
        } catch (e) {
            console.error('jwt verify error ----> ' + e)
            return false
        }
    }
}