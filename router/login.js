const { request } = require('express');
var express = require('express')
var router = express.Router();
const db = require('../config/mysql.js')
var jwt = require('jsonwebtoken');
var secretToken = require('../config/jwt.js')
const cookieParser = require('cookie-parser');
const { JsonWebTokenError } = require('jsonwebtoken');
const { decode } = require('jsonwebtoken');
// const {verifyToken} = require('../middleware/authorization');
router.use(cookieParser());


router.post('/', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const sql = "SELECT * from emailpwd where email= ?"
    db.query(sql, [email], function(err, result, fields){
        if(err) throw err;
        responseData = {};
        if(result[0]){
            if (password === result[0].pwd) {
            responseData.result = "exist";
            responseData.email = email
            var token = jwt.sign({email : email}, secretToken.secret, {
                expiresIn: '5h'    
              });
            res.cookie('user444', token)
            res.json(responseData);
              console.log(req.cookies)
            } else {
                responseData.result = "wrong pwd";
                res.json(responseData);

            }
        } else {
            responseData.result = "none"
            res.json(responseData);

        }
        console.log(responseData)
    })

})
const verifyToken = (req, res, next) => {
    console.log(req.cookies)

    try {
        console.log(req.cookies)
        const clientToken = req.cookies.user444;
        const decoded = jwt.verify(clientToken, secretToken.secret);

        if (decoded){
            console.log('??')
            res.locals.email = decoded.email;
            next();
        }
    } catch (err){
        res.status(401).json({error : 'token expired'});
    }
}

router.post('/check', verifyToken);

module.exports = router;