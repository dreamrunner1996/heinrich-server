const express = require('express')
const app = express()
const jwtConfig = require('./config')

const payload = {
    username: 'heinrich-test',
    phone: 13160951709
}

const token = jwtConfig.generate(payload, '10s')
const info = jwtConfig.verify(token)
console.log(info)
setTimeout(() => {
    const info2 = jwtConfig.verify(token)
    console.log(info2)
}, 11000)
