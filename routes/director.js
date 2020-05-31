const express = require('express');
const router = express.Router();

//models
const Director = require('../models/Director');

router.post('/', (req, res, next) => {
    const { name, username, bio} = req.body;
    const director = new Director({
        name:name,
        username:username,
        bio:bio
    });

    const promise = director.save();
    promise.then(data => res.json({ status: 1 }))
        .catch(err => res.json(err));
});

module.exports = router;
