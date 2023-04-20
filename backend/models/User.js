const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_name:{
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "User"
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);