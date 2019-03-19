const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true 
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next){
    console.log("Pre save");
    const user = this;
    if(!user.isModified || !user.isNew){
        console.log("Pre save - isnew / ismodified");
        next();
    }else{
        bcrypt.hash(user.password, 10, function(err, hash){
            if(err){
                console.log("Error hashing password for user", user.email);
                next(err);
            }else{
                console.log("Hashing password");
                user.password = hash;
                next();
            }
        })
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;