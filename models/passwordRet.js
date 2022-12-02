const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const PasswordretSchema=new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    otp: {
        type: String,
        default: ''
    },
    createdAt: { type: Date, default: Date.now, expires: '3m'  }
});

var PasswordRets = mongoose.model('PasswordRet',PasswordretSchema);
module.exports= PasswordRets; 