const express = require('express');
const router = express.Router();
const bcrypt1 = require('bcrypt');
const jwt = require('jsonwebtoken');

//Model
const User = require('../models/User');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});


router.post('/', (req, res) => {

  const{ username, password} = req.body;

  bcrypt1.hash(password,10)
      .then(hash =>{
        const user = new User({
          username:username,
          password:hash
        });

        const promise = user.save();

        promise.then(data => res.json(data))
            .catch(err => res.json(err));
      })


});

//Kullanıcıya Json web token  verme
router.get('/authenticate', (req, res) =>{
    const { username, password } = req.body
    User.findOne({ username }, (err, user) =>{
        if(err)
            throw err;

        if (!user){
            res.json({
                status: false,
                message: 'Authentication failed, user not found.'
            });
        }else{
            bcrypt1.compare(password,user.password)
                .then(result => {
                    if(!result){
                        res.json({status: false, message: 'Yanlış Parola'});
                    }else{

                        const payload = {
                            username
                        };

                        const token = jwt.sign(payload, req.app.get('api_secret_key'),{
                            expiresIn: 720
                        });

                        res.json({status: true, token});


                    }
                })
                .catch(err => res.json(err));
        }


    });
});
module.exports = router;
