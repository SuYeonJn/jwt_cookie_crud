const { request } = require('express');
var express = require('express')
var router = express.Router();
const db = require('../config/mysql.js')


router.post('/', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    const check = "SELECT * from emailpwd where email= ?"
    db.query(check, [email], function(err, result, fields){
        if(err) throw err;
        if (result[0]) {
            res.json({email : "already exists"})
        }
        else {
            const sql = `insert into emailpwd(email, pwd) values('${email}','${password}')`
            db.query(sql, function(err, result, fields){
                if(err) throw err;
                console.log("db get email & pwd")
            })
            res.json({email: email  , pwd : password })
        }
    })

    
})

module.exports = router;