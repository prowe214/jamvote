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

router.post('/addsong', function(req, res, next) {
  posts.insert(req.body);
  posts.update(req.body, {$set: {score: 1}});
  res.redirect(302, '/');
});

router.post('/:id/upvote', function(req, res, next) {
  posts.update({_id: req.params.id}, {$inc: {score: 1}});
  res.redirect(302, '/');
});

router.post('/:id/downvote', function(req, res, next) {
  posts.update({_id: req.params.id}, {$inc: {score: -1}});
  res.redirect(302, '/');
});

module.exports = router;
