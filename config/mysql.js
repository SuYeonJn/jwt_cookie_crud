const mysql = require('mysql')
const db =  mysql.createConnection( {
    host     : 'localhost',
    user     : 'root',
    password : '111111',
    database : 'test'
  })
module.exports = db;
