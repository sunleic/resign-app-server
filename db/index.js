const mysql = require('mysql')

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'0903Sunlei',
    database:'resign_db'
})

module.exports = db