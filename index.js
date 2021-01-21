const  SettingApi = require('./api/setting/index')
const { AddMysql, DeleteMysql, UpdateMysql, CheckMysql } = require('./api/mysql/api')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const { getFiles } = require('./api/getFile/api')
const fs = require('fs')

let getNumber = 0
let postNumber = 0

// GET 路由设置
function RouterGet (address, api = false, data = undefined) {
    if (typeof(address) !== 'string') {
        console.error('Please Check your Router-Address from Router-Get!')
        return
    }
    app.get(address, (req, res) => {
        res.setHeader('Content-Type','text/plain;charset=utf-8')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
        getNumber += 1
        console.log(`----------  ${address}  ----------`)
        console.log('router-get api is used - ' + getNumber)
        console.log('----------------------------------')
        if (data === undefined && !api) res.send('Welcome to ' + address)
        else if (data !== undefined && !api) res.send('Welcome to ' + address + ', data is ' + data)
        else if (data === undefined && api) {
            const reqQuery = {
                title: 'Welcome to ' + address,
                address: address,
                method: 'GET'
            }
            res.send(reqQuery)
        } else {
            const reqQuery = {
                title: 'Welcome to ' + address,
                address: address,
                method: 'GET',
                data: req.query
            }
            res.send(reqQuery)
        }
    })
}
// POST 路由设置
function RouterPost (address, api = false, data = undefined) {
    if (typeof(address) !== 'string') {
        console.error('Please Check your Router-Address from Router-Post!')
        return
    }
    app.post(address, urlencodedParser, (req, res) => {
        res.setHeader('Content-Type','text/plain;charset=utf-8')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
        postNumber += 1
        console.log(`----------  ${address}  ----------`)
        console.log('router-post api is used - ' + postNumber)
        console.log('----------------------------------')
        if (data === undefined && !api) res.send('Welcome to ' + address)
        else if (data !== undefined && !api) res.send('Welcome to ' + address + ', data is ' + data)
        else if (data === undefined && api) {
            const reqBody = {
                title: 'Welcome to ' + address,
                address: address,
                method: 'POST'
            }
            res.send(reqBody)
        } else {
            const reqBody = {
                title: 'Welcome to ' + address,
                address: address,
                method: 'POST',
                data: req.body
            }
            res.send(reqBody)
        }
    })
}
// PUT 路由设置
function RouterPut () {}
// DELETE 路由设置
function RouterDelete () {}

// 设置静态文件


app.use('/api', express.static('api'))
app.use('/router', express.static('router'))
app.use('/public', express.static('public'))
app.use('/music', express.static('music'))
app.use('/photo', express.static('photo'))

// 设置路由
RouterGet('/', false, 'express')
RouterGet('/get', true, 'this is get data')
RouterPost('/post', true, 'this is post data')

// 数据库增删改查接口
app.post('/addSqlData', urlencodedParser, (req, res) => {
    res.setHeader('Content-Type','text/plain;charset=ut' +
        'f-8')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
    const reqBody = req.body
    console.log(reqBody)
    let sqlParams = [reqBody['id'], reqBody['type'], reqBody['title'], reqBody['description'], reqBody['context']]
    AddMysql(sqlParams)
})
app.post('/delSqlData', urlencodedParser, (req, res) => {
    res.setHeader('Content-Type','text/plain;charset=utf-8')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
    const reqBody = req.body
    console.log(reqBody)
    let sqlParams = [reqBody['id']]
    DeleteMysql(sqlParams)
})
app.post('/updSqlData', urlencodedParser, (req, res) => {
    res.setHeader('Content-Type','text/plain;charset=utf-8')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
    const reqBody = req.body
    console.log(reqBody)
    let sqlParams = [reqBody['type'], reqBody['title'], reqBody['description'], reqBody['context'], reqBody['id']]
    DeleteMysql(sqlParams)
})
app.get('/checkSqlData', (req, res) => {
    res.setHeader('Content-Type','text/plain;charset=utf-8')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
    res.send(CheckMysql())
    res.end()
})
// RouterPost('/add-data', true, 'Add MYSQL data')
// RouterPost('/del-data', true, 'Delete MYSQL data')
// RouterPost('/upd-data', true, 'Update MYSQL data')
// RouterPost('/che-data', true, 'Check MYSQL data')

// fs.readFileSync()

// readFileList('./assets/file')
app.get('/fileList', (req, res) => {
    res.setHeader('Content-Type','text/plain;charset=utf-8')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
    const fileListArray = getFiles.getFileList("./assets/file/")
    res.send(fileListArray)
    res.end()
})
app.get('/musicList', (req, res) => {
    res.setHeader('Content-Type','text/plain;charset=utf-8')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
    const fileListArray = getFiles.getFileList("./music/")
    res.send(fileListArray)
    res.end()
})
app.get('/photoList', (req, res) => {
    res.setHeader('Content-Type','text/plain;charset=utf-8')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
    const fileListArray = getFiles.getFileList("./photo/")
    res.send(fileListArray)
    res.end()
})
app.get('/download', (req, res) => {
    res.setHeader('Content-Type','text/plain;charset=utf-8')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Acscess-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
    const path = req.query
    const fileUrl = decodeURI(path.url)
    const fileName = decodeURI(path.name)
    const fileStream = fs.createReadStream(fileUrl)
    res.setHeader('Content-type', 'application/octet-stream')
    res.setHeader('Content-Disposition', `attachment; filename=${encodeURI(fileName)}`)
    fileStream.on('data', function (data) {
        res.write(data, 'binary')
    })
    fileStream.on('end', function () {
        res.end()
        console.log('The file has been downloaded successfully!')
    })
})

SettingApi.SettingListen()
app.listen(SettingApi.listenPort)
