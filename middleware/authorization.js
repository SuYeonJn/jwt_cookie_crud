const jwt = require('jsonwebtoken');
var secretToken = require('../config/jwt.js');

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

exports.verifyToken = verifyToken;
