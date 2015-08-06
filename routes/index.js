var express = require('express');
var router = express.Router();
require('dotenv').load();
var db = require('monk')(process.env.MONGOLAB_URI);
var posts = db.get('posts');

/* GET home page. */
router.get('/', function(req, res, next) {
  posts.find({}, function (err, docs) {
    res.render('index', { title: 'JamVote', posts: docs });
  });
});

router.get('/addsong', function(req, res, next) {
  res.render('addSong', { title: 'JamVote' });
});

router.post('/:id/upvote', function(req, res, next) {
  posts.update({_id: req.params.id}, {$inc: {votes: 1}});
  res.redirect('/', {title: 'JamVote', posts: docs});
});

router.post('/:id/downvote', function(req, res, next) {
  posts.update({_id: req.params.id}, {$inc: {votes: -1}});
  res.redirect('/', {title: 'JamVote', posts: docs});
});

module.exports = router;
