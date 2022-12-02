const bodyParser= require('body-parser');
const express= require('express');
const FavoriteMovies= require('../models/favoritemovies');
const authenticate= require('../authenticate');
const mongoose = require('mongoose');
const favoriteMovieRouter= express.Router();
favoriteMovieRouter.use(bodyParser.json());

favoriteMovieRouter.route('/')
.get(authenticate.verifyUser,(req,res,next)=>{
    FavoriteMovies.findOne({user: req.user._id})
    .populate('favoritemovies')
    .then(usermovies=>{
        if(!usermovies){
            FavoriteMovies.create({user: req.user._id,favoritemovies: []})
            .then(favor=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(favor);
            },err=>next(err));
        }
        else{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(usermovies);
        }
    },err=>next(err));
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    FavoriteMovies.findOne({user: req.user._id})
    .then(favor=>{
        favor.favoritemovies=[];
        favor.save()
        .then(favor1=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(favor1);
        },err=>next(err));
    },err=>next(err));
});

favoriteMovieRouter.route('/:movieId')
.post(authenticate.verifyUser,(req,res,next)=>{
    
    res.setHeader('Content-Type','application/json');
    FavoriteMovies.findOne({user: req.user._id})
    .then(favor=>{
        if(!favor){
            FavoriteMovies.create({user: req.user._id})
            .then(favor2=>{
                favor2.favoritemovies.push(req.params.movieId);
                favor2.save()
                .then(favor3=>{
                    FavoriteMovies.findById(favor3._id)
                    .populate('favoritemovies')
                    .then(favor5=>{
                        res.statusCode=200;
                        res.json(favor5);
                        return next();
                    },err=>next(err));
                },err=>next(err));
            },err=>next(err))
        }
        else if(favor.favoritemovies.length==0){
            favor.favoritemovies.push(req.params.movieId);
            favor.save()
            .then(favor4=>{
                FavoriteMovies.findById(favor4._id)
                .populate('favoritemovies')
                .then(favor5=>{ 
                    res.statusCode=200;
                    res.json(favor5);
                },err=>next(err)); 
            },err=>next(err));
        }
        else if(favor.favoritemovies.indexOf(req.params.movieId) == -1){ 
            var k=favor.favoritemovies[0];
            favor.favoritemovies[0]=req.params.movieId;
            for(let i=1;i<favor.favoritemovies.length;i++){
                let l=favor.favoritemovies[i];
                favor.favoritemovies[i]=k;
                k=l;
            }
            favor.favoritemovies.push(k);
            favor.save()
            .then(favor4=>{
                FavoriteMovies.findById(favor4._id)
                .populate('favoritemovies')
                .then(favor5=>{ 
                    res.statusCode=200;
                    res.json(favor5);
            },err=>next(err)); 
            },err=>next(err));
        }
        else{
            res.statusCode=200;
            res.json(favor);
        }
    },err=>next(err));
    
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    FavoriteMovies.findOne({user: req.user._id})
    .then(favor=>{
        if(favor.favoritemovies.indexOf(req.params.movieId) != -1){
            favor.favoritemovies=favor.favoritemovies.filter(item => item.toString() != req.params.movieId);
            favor.save()
            .then(favor=>{
                FavoriteMovies.findById(favor._id)
                .populate('favoritemovies')
                .then(favor2=>{
                    res.statusCode=200;
                    res.setHeader('Content-Type','application/json');
                    res.json(favor2); 
                },err=>next(err));
              
            },err=>next(err));
        }
        else{
            res.statusCode=403;
            res.setHeader('Content-Type','application/json');
            res.json({resp: 'No favorite Movies to delete'});
        }
    })
});

module.exports= favoriteMovieRouter;