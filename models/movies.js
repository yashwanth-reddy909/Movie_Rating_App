const mongoose = require('mongoose');
const Schema= mongoose.Schema;

var ratingSchema=new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});
var movieSchema= new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    cast: [String],
    genre: [String],
    comments: [ratingSchema],
    imageurl: {
        type: String
    }

},{
    timestamps: true
});

var Movies= mongoose.model('Movie',movieSchema);
module.exports=Movies;