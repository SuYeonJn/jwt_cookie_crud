const express = require('express')
const app = express()
const db = require('./config/mysql.js')
var cors = require('cors');
const login = require('./router/login')
const join = require('./router/join')
const cookieParser = require('cookie-parser')
// const corsOptions = {
//     origin: ["http://localhost:5000"],
//     credentials: true,
//   };
//app.use(cors(corsOptions));
//서버랑 프론트엔드의 localhost 가 다를 때
  
db.connect(err => {
console.log("mysql conn");
})

app.use(express.json());
app.use(cors())
app.use(cookieParser());

app.use('/login', login)
app.use('/join', join)


app.get('/', (req,res) => {
    res.render('../index.html')
})


app.listen(5000, () => console.log('server is running'))