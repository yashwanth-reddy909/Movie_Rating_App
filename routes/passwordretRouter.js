const bodyParser= require('body-parser');
const express= require('express');
const PasswordRets= require('../models/passwordRet');
const authenticate= require('../authenticate');
const mongoose = require('mongoose');
var User= require('../models/user');
const passport=require('passport');

const passwordRetRouter= express.Router();
passwordRetRouter.use(bodyParser.json());
var nodemailer = require('nodemailer');

// const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2;
// const oauth2Client = new OAuth2(
//     process.env['OAuth1'],
//     process.env['OAuth2'],
//     "https://developers.google.com/oauthplayground" 
// );
// oauth2Client.setCredentials({
//     refresh_token: process.env['refreshToken']
// });
// const accessToken = oauth2Client.getAccessToken()



// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       type: 'OAuth2',
//       user: 'movieratingapp18@gmail.com',
//       clientId: process.env['OAuth1'],
//       clientSecret: process.env['OAuth2'],
//       refreshToken: process.env['refreshToken'],
//       accessToken: accessToken
//     }
//   });
// const mailOptions={
//     from: "movieratingapp12@gmail.com",
//     to: "yaswanthreddy909@gmail.com",
//     subject: "Node.js Email with Secure OAuth",
//     generateTextFromHTML: true,
//     html: "<b>test</b>"
// };
// transporter.sendMail(mailOptions, (error, response) => {
//     error ? console.log('k') : console.log(response);
//     transporter.close();
// });

passwordRetRouter.route('/')
.post((req,res,next)=>{
    User.findOne({emailid: req.body.emailid})
    .then(user=>{
        // if(!user){
            res.statusCode=403;
            res.setHeader('Content-Type','application/json');
            res.json({resp: 'No such User'});
            
    //     }else{
    //     PasswordRets.findOne({user: user._id})
    //     .then(pas=>{
    //         const fourdigitst=(Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        
    //         if(!pas){
    //             PasswordRets.create({user: user._id,otp: fourdigitst})
    //             .then(resp=>{
    //                 var mailOptions = {
    //                     from: 'movieratingapp18@gmail.com',
    //                     to: user.emailid,
    //                     subject: 'OTP confirmation from PIXELS MOVIE RATING APP',
    //                     text: 'Hi '+user.username+', Here is your '+fourdigitst+ ' confirmation pin.\nIf it is not you kindly ignore this email. \n\n\n\nThis is a Computer generated mail \nRegards, \nYashwanth Reddy'
                       

    //                   };
    //                   transporter.sendMail(mailOptions, function(error, info){
    //                     if (error) {
    //                         console.log('Cant send');
    //                       console.log(error);
    //                     } 
    //                   });
    //                 res.statusCode=200;
    //                 res.setHeader('Content-Type','application/json');
    //                 res.json(resp);              
    //             },err=>next(err));
    //         }
    //         else{
    //             PasswordRets.deleteOne({user: user._id})
    //             .then(resp=>{
    //                 PasswordRets.create({user: user._id,otp: fourdigitst})
    //                 .then(resp2=>{
    //                     var mailOptions = {
    //                         from: 'movieratingapp18@gmail.com',
    //                         to: user.emailid,
    //                         subject: 'OTP confirmation from PIXELS MOVIE RATING APP',
    //                         text: 'Hi '+user.username+', Here is your '+fourdigitst+ ' confirmation pin.\nThese is only valid for 3 mins.\nIf it is not you kindly ignore this email. \n\n\n\nThis is a Computer generated mail \nRegards, \nYashwanth Reddy'
    //                       };
    //                       transporter.sendMail(mailOptions, function(error, info){
    //                         if (error) {
    //                             console.log('Cant send');
    //                           console.log(error);
    //                         } 
    //                       });
    //                     res.statusCode=200;
    //                     res.setHeader('Content-Type','application/json');
    //                     res.json(resp2); 
    //                 },err=>next(err))
    //             },err=>next(err))
    //         }
    //     },err=>next(err))
    // }
})

});
passwordRetRouter.route('/q')
.post((req,res,next)=>{
    User.findOne({emailid: req.body.email})
    .then(user=>{
        // 1st comment
        // if(!user){
            res.statusCode=403;
            res.setHeader('Content-Type','application/json');
            res.json({resp: 'No such User'});
            // 2 comment
    //     }else{
    //     PasswordRets.findOne({user: user._id,otp: req.body.otp})
    //     .then(resp=>{
    //         if(!resp){
    //             res.statusCode=403;
    //             res.setHeader('Content-Type','application/json');
    //             res.json({err: 'otp/username is invalid'});
    //         }
    //         else{
    //             user.setPassword(req.body.password,(err,user)=>{
    //                 user.save()
    //                 .then(resp1=>{
    //                     res.statusCode=200;
    //                     res.setHeader('Content-Type','application/json');
    //                     res.json({res: 'Success'})
    //                 },err=>next(err))
    //             });       

    //         }
    //     },err=>next(err))
    // }
    })
});
module.exports= passwordRetRouter;