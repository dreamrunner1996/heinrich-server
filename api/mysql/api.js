const mysql = require('mysql')
const mysqlApi = require('./config')

const mysqlTable = 'study'
const addSql = `INSERT INTO ${mysqlTable} (id, type, title, description, context) VALUES (?, ?, ?, ?, ?)`
const delSql = `DELETE FROM ${mysqlTable} WHERE id = `
const updateSql = `UPDATE ${mysqlTable} SET type = ?, title = ?, description = ?, context = ? WHERE id = ?`
const checkSql = `SELECT * FROM ${mysqlTable}`

// 增   [id, type, title, description, context]
function AddMysql (addSqlParams) {
    let sqlParams = addSqlParams
    // sqlParams[4] = JSON.stringify(addSqlParams[4])
    console.log(sqlParams)
    const connection = mysql.createConnection(mysqlApi)
    connection.connect()
    connection.query(addSql, sqlParams, (err, result) => {
        if (err) { console.log('[SELECT ERROR] - ', err.message); return }
        console.log('ADD SUCCESS --- INSERT ID:',result)
    })
    connection.end()
}
// 删   [id]
function DeleteMysql (id) {
    const connection = mysql.createConnection(mysqlApi)
    connection.connect()
    const delParams = `${delSql}${id}`

    connection.query(delParams, (err, result) => {
        if (err) {
            console.log('[DELETE ERROR] - ',err.message)
            return
        }
        console.log('DELETE affectedRows',result.affectedRows)
    })
}
// 改   [type, title, description, context, id]
function UpdateMysql (UpdSqlParams) {
    const connection = mysql.createConnection(mysqlApi)
    connection.connect()
    // let updateSqlParams = UpdSqlParams
    // updateSqlParams[3] = JSON.stringify(UpdSqlParams[3])

    connection.query(updateSql, UpdSqlParams, (err, result) => {
        if(err){
            console.log('[UPDATE ERROR] - ',err.message)
            return
        }
        console.log('UPDATE affectedRows',result.affectedRows)
    })
    connection.end()
}
// 查   []
async function CheckMysql () {
    let resultData = {
        status: 'none',
        data: []
    }
    const connection = mysql.createConnection(mysqlApi)
    connection.connect()
    await connection.query(checkSql, (err, result) => {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message)
            resultData.status = 'error'
        } else {
            resultData.status = 'success'
            resultData.data = result
        }
        console.log(resultData)
        return resultData
    })
    connection.end()
}

module.exports = {
    AddMysql, DeleteMysql ,CheckMysql, UpdateMysql
}
