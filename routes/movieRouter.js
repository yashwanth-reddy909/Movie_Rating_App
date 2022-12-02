const bodyParser= require('body-parser');
const express= require('express');
const mongoose = require('mongoose');
const Movies= require('../models/movies');
const authenticate= require('../authenticate');
const movieRouter= express.Router();
movieRouter.use(bodyParser.json());

movieRouter.route('/')
.get((req,res,next)=>{
    Movies.find({})
    .then(movies=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(movies);
    },err=>next(err))
    .catch(err=>{
        next(err);
    });
})
.post(authenticate.verifyUser,(req,res,next)=>{
    Movies.create(req.body)
    .then(movie=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(movie);
    },err=>next(err))
    .catch(err=>next(err));
})
.put(authenticate.verifyUser,(req,res,next)=>{
    authenticate.verifyAdmin(req,res,next);
    res.statusCode=403;
    res.json({err: 'cant operate a put on /movies'});
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    authenticate.verifyAdmin(req,res,next);
    Movies.remove({})
    .then(resp=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },err=>next(err))
    .catch(err=>next(err));
});

movieRouter.route('/:movieId')
.get((req,res,next)=>{
    Movies.findById(req.params.movieId)
    .then(movie=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(movie);
    })
    .catch(err=>next(err));
})
.post((req,res)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /movies/'+ req.params.movieId);
})
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{  
    Movies.findByIdAndUpdate(req.params.movieId,{$set: req.body},{new: true})
    .then(movie=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(movie);
    })
    .catch(err=>{
        next(err);
    });
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    Movies.findByIdAndRemove(req.params.movieId)
    .then(resp=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },err=>next(err))
    .catch(err=>next(err));
});

movieRouter.route('/:movieId/comments')
.get((req,res,next)=>{
    Movies.findById(req.params.movieId)
    .populate('comments.author')
    .then(movie =>{
        if(movie){
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(movie.comments);
        }
        else{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json({err: 'Movie not Found'});
        }
    })
    .catch(err=>next(err));
})
.post(authenticate.verifyUser,(req,res,next)=>{
    Movies.findById(req.params.movieId)
    .then(movie=>{
        req.body.author=req.user._id;
        movie.comments.push(req.body);
        movie.save()
        .then(movie=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(movie);
        })
        .catch(err=>next(err));
    });
})
.put(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.json({err: `cant operate a put on /${req.params.movieId}/comments`});
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    authenticate.verifyAdmin(req,res,next);
    Movies.findById(req.params.movieId)
    .then(movie=>{
        movie.comments=[];
        movie.save()
        .then(movie2=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(movie2);
        })
        .catch(err=>next(err));
    })
    .catch(err=>next(err));
});

movieRouter.route('/:movieId/comments/:commentId')
.get((req,res,next)=>{
    Movies.findById(req.params.movieId)
    .then(movie=>{
        if(movie.comments.id(req.params.commentId)){
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(movie.comments.id(req.params.commentId));
        }
        else{
            res.statusCode=403;
            res.setHeader('Content-Type','application/json');
            res.json({err: "comment not found"});
        }
    },err=>next(err))
    .catch(err=>next(err));
})
.put(authenticate.verifyUser,(req,res,next)=>{
    Movies.findById(req.params.movieId)
    .then(movie=>{
        var orgAuthor=movie.comments.id(req.params.commentId).author.toString();
        console.log(orgAuthor);
        console.log(req.user._id.toString());
        if(orgAuthor!=req.user._id.toString()){
            console.log('Your on wrong side!');
            res.statusCode=403;
            res.setHeader('Content-Type','application/json');
            res.json({err : 'Your are not authorized to edit this comment'});
        }
        else{
            movie.comments.id(req.params.commentId).rating=req.body.rating;
            movie.save()
            .then(movie2=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(movie2);
            })
            .catch(err=>next(err));
        }
        
    },err=>next(err));

    
})
.post(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.json({err: `cant operate a put on /movies${req.params.movieId}/comments/${req.params.commentId}`});    
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Movies.findById(req.params.movieId)
    .then(movie=>{
        var orgAuthor=movie.comments.id(req.params.commentId).author.toString();
        console.log(orgAuthor);
        console.log(req.user._id.toString());
        if(orgAuthor!=req.user._id.toString()){
            console.log('Your on wrong side!');
            res.statusCode=403;
            res.setHeader('Content-Type','application/json');
            res.json({err : 'Your are not authorized to delete this comment'});
        }
        else{
            movie.comments.id(req.params.commentId).remove();
            movie.save()
            .then(movie2=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(movie2);
            })
            .catch(err=>next(err));
        }
        
    },err=>next(err));
});


module.exports=movieRouter;