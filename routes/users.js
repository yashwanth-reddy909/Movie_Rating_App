var express = require('express');
var router = express.Router();
var User= require('../models/user');
const bodyParser=require('body-parser');
const passport=require('passport');
const authenticate=require('../authenticate');
router.use(bodyParser.json());
router.get('/', authenticate.verifyUser,function(req, res, next) {
  res.statusCode=200;
  res.setHeader('Content-Type','application/json');
  res.json({'res': 'respond with a resource'});

});
router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username,emailid: req.body.emailid}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json(err);
    }
    else {
      if (req.body.firstname){
        user.firstname = req.body.firstname;
      }
      if (req.body.lastname){
        user.lastname = req.body.lastname;
      }
     
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json(err);
          return ;
      }
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    });
  }
});
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!',
          userid: req.user._id,
          userName: req.user.username,
          userFirstName: req.user.firstname,
          userLastName: req.user.lastname
          });
});

router.put('/accountdetails',authenticate.verifyUser,function(req,res,next){

  User.findByIdAndUpdate(req.user._id,{$set: req.body},{new: true})
  .then(user=>{
    res.statusCode=200;
    res.setHeader('Content-Type','appplication/json');
    res.json(user);
  },err=>next(err));
});

router.get('/accountdetails',authenticate.verifyUser,(req,res,next)=>{
  console.log(req.user.password);
  User.findById(req.user._id)
  .then(user=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(user);
  },err=>next(err));
});

router.get('/usernames',(req,res,next)=>{
  User.find({})
  .then((users)=>{
    var allusernames=[]
    for(let i=0;i<users.length;i++){
      allusernames.push(users[i].username);
    }
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(allusernames);
  },err=>next(err));
});
router.get('/emails',(req,res,next)=>{
  User.find({})
  .then((users)=>{
    var allemails=[]
    for(let i=0;i<users.length;i++){
      allemails.push(users[i].emailid);
    }
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(allemails);
  },err=>next(err));
});
router.post('/getusername',(req,res,next)=>{
  User.findOne({emailid: req.body.emailid})
  .then((user)=>{
    if(user){
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json({username: user.username});
    }
    else{
      res.statusCode=403;
      res.end('No such user');
    }
  },err=>next(err));
})

module.exports = router;