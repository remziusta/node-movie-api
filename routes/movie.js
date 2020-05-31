const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/Movie');

router.post('/', (req, res, next) => {
  const { title, category, country, year, imdb_score } = req.body;
  const movie = new Movie({
    title:title,
    category:category,
    country:country,
    year: year,
    imdb_score:imdb_score
  });

  const Promise = movie.save();
  Promise.then( data => res.json({ status: 1 }) )
      .catch(err => res.json(err) )
});

//TÜM DATALAR
router.get('/', (req, res) => {
  const promise = Movie.find({ });
  promise.then(data => res.json(data))
      .catch(err => res.json(err));
});

//TOP 10 List
router.get('/top10', (req, res,next) => {
  const promise = Movie.find({}).limit(10).sort({imdb_score: -1});


  promise.then(movie => {
    if (!movie)
      next({message: 'Film Bulunamadı'});
    res.json(movie);
  })
      .catch(err => res.json(err));
});

//BELLİ ID'YE GÖRE
router.get('/:movie_id', (req, res,next) => {
  const promise = Movie.findById(req.params.movie_id);
  promise.then(movie => {
    if (!movie)
      next({message: 'Film Bulunamadı'});
    res.json(movie);
  })
   .catch(err => res.json(err));
});

//ID'YE GÖRE GÜNCELLEME
router.put('/:movie_id', (req, res,next) => {
  const promise = Movie.findByIdAndUpdate(
      req.params.movie_id,
      req.body,
  {
    new: true
    });

  promise.then(movie => {
    if (movie === null)
      next({message: 'Film Bulunamadı', code: 22});
    res.json({ status: 1 });
  })
      .catch(err => res.json(err));
});

//ID'YE GÖRE SİLME
router.delete('/:movie_id', (req, res,next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  promise.then(movie => {
    if (!movie)
      next({message: 'Film Bulunamadı'});
    res.json({ status: 1 });
  })
      .catch(err => res.json(err));
});

router.get('/between/:start_year/:end_year', (req, res,next) => {
  const {start_year,end_year} = req.params;
  const promise = Movie.find({
    year: { "$gte": parseInt(start_year), "$lte":parseInt(end_year) }
  });
  promise.then(movie => {
    if (!movie)
      next({message: 'Film Bulunamadı'});
    res.json(movie);
  })
      .catch(err => res.json(err));
});


module.exports = router;
