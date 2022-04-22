const express = require('express')
const app = express()
const db = require('./config/mysql.js')
var cors = require('cors');
const login = require('./router/login')
const join = require('./router/join')
const cookieParser = require('cookie-parser')

db.connect(err => {
console.log("mysql conn");
})

app.use(express.json());
app.use(cors())
app.use(cookieParser());

app.use('/login', login)
app.use('/join', join)


app.get('/', (req,res) => {
    res.send("ddd")
})


app.listen(5000, () => console.log('server is running'))