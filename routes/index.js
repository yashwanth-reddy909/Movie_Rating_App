
var router = require('express').Router();
const path=require('path');
var user = require('./users');
var movieRouter= require('./movieRouter');
var favoriteMovieRouter= require('./favoritemovieRouter');
var passwordRetRouter=require('./passwordretRouter');

router.use('/backendapi/users', user);
router.use('/backendapi/movies',movieRouter);
router.use('/backendapi/towatch',favoriteMovieRouter);
router.use('/backendapi/retreivepassword',passwordRetRouter);
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../movie-rating-reactapp/build/index.html'));
	
});

module.exports = router;
