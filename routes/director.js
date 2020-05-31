const mongoose = require('mongoose');
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


router.get("/", (req,res) => {
    const promise = Director.aggregate([
        {
            $lookup:{
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind:{
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id:{
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies:{
                    $push: '$movies'
                }
            }
        },
        {
            $project:{
                _id:'$_id._id',
                name: '$_id.name',
                surname:'$_id.surname',
                movies:'$movies',
            }
        }
    ]);

    promise.then(data => { res.json(data)})
        .catch(err => res.json(data));
});

router.get("/:director_id", (req,res) => {
    const promise = Director.aggregate([
        {
          $match:{
              '_id': mongoose.Types.ObjectId(req.params.director_id)
          }
        },
        {
            $lookup:{
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind:{
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id:{
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies:{
                    $push: '$movies'
                }
            }
        },
        {
            $project:{
                _id:'$_id._id',
                name: '$_id.name',
                surname:'$_id.surname',
                movies:'$movies',
            }
        }
    ]);

    promise.then(data => { res.json(data)})
        .catch(err => res.json(data));
});

module.exports = router;
