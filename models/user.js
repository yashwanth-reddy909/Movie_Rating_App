const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const passportlocalMongoose = require('passport-local-mongoose');
var User = new Schema({
    admin: {
        type: Boolean,
        default: false
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    emailid:{
        type: String,
        unique: true,
        required: true
    }
});
User.plugin(passportlocalMongoose);
module.exports=mongoose.model('User',User);