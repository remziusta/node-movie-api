const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if (token){

        jwt.verify(token,'çok gizli anahtar', (err, decoded) => {
            if (err){
                console.log(decoded);
                res.json({
                    status:false,
                    message:'Failed to authenticate token.'
                });
            }else{
                req.decode = decoded;
                next();
            }
        });
    }else{
        res.json({
            status: false,
            message: 'No token provided'
        })
    }
};