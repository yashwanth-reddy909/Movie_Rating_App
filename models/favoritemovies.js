const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const FavoritemovieSchema=new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    favoritemovies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }]
});

var FavoriteMovies= mongoose.model('FavoriteMovie',FavoritemovieSchema);
module.exports= FavoriteMovies; 