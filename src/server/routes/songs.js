const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
  knex('songs')
  .then(function(results) {
    const renderObject = {};
    renderObject.songs = results;
    res.render('songs', renderObject);
  }).catch(function(err) {
    return next(err);
  });
});

router.get('/new', function (req, res, next) {
  res.render('new');
});

router.post('/new', function (req, res, next) {
  const title = req.body.title;
  const artist = req.body.artist;
  const album = req.body.album;
  knex('songs')
    .insert({
      title: title,
      artist: artist,
      album: album
    })
    .then(function(results) {
      res.redirect('/songs');
    }).catch(function(err) {
      return next(err);
    });
});

router.delete('/:id', function(req, res, next) {
  var songId = req.params.id;
  knex('songs')
    .del()
    .where('id', songId)
    .returning('*')
    .then(function(results) {
      const renderObject = {};
      renderObject.message = `${results[0].title} was deleted`;
      renderObject.id = songId;
      res.json(renderObject);
    });
});

router.put('/:id', function (req, res, next) {
  var songId = req.params.id;
  var newSong = {};
  var update = {
    title: req.body.title || null,
    artist: req.body.artist || null,
    album: req.body.album || null
  };
  knex('songs')
    .where('id', songId)
    .then((song) => {
      for (var key in update) {
        if (update[key]) {
          newSong[key] = update[key];
        } else {
          newSong[key] = song[key];
        }
      }
    }).then(() => {
      return knex('songs')
        .update({
          title: newSong.title,
          artist: newSong.artist,
          album: newSong.album
        })
        .where('id', songId);
    }).then(() => {
      knex('songs')
        .then((results) => {
          const renderObject = {};
          renderObject.songs = results;
          res.render('songs', renderObject);
        });
    });
});
module.exports = router;
