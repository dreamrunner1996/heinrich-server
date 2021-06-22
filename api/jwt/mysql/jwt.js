const mysql = require('mysql')
const mysqlApi = require('./../../mysql/config')

const mysqlTable = 'jwt'

function AddJWT () {
    const addSql = `INSERT INTO ${mysqlTable} (id, username, password, token, time, excude) VALUES(?, ?, ?, ?, ?, ?)`
    const connection = mysql.createConnection(mysqlApi)
    connection.connect()
    connection.query()
}
