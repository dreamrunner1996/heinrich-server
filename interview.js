const express = require('express')
const app = express()

app.use('/interview', express.static('interview/views'))

console.log('interview start is port: http://localhost:1145')
app.listen(1145)
