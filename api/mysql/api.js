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
        if (err) {
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


// 阿源1.1W, 阿勇8.5k,
// 信息科未来方向 不是当前方向, 结构是前提
// 梓豪, 啊均 在M类  工资与项目挂钩, 与其他计算方式不一样
// 对于项目来说, 你加不加班, 是你的问题, 但我告诉你没有加班费...
// 现在工资最高的是电气部. 平均1W以上
// 信息科 T3 以下有加班费
// T类P类工资:  例如10k, 抽取10%左右(按照等级定)作 固定或浮动,  剩下基本
// M类工资:  例如10k, 8k基本 1k连项目 1k固定 或 浮动
// 特别指出 小龙 工资全靠加班费, 重点修改对象


module.exports = {
    AddMysql, DeleteMysql ,CheckMysql, UpdateMysql
}
