const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/users');

module.exports = {
    add: (req, res) => {
        let result = {};
        let status = 201;
        const {firstName, lastName, email, password} = req.body;
        const user = new User({firstName, lastName, email, password});

        user.save((err, user) => {
            if(!err){
                result.status = status;
                result.result = user;
            }else{
                status = 500;
                result.status = status;
                result.error = err;
            }
            res.status(status).send(result);
        });
    },

    login: (req, res) => {
        let result = {};
        let status = 200;
        const {email, password} = req.body;
        
        User.findOne({email}, (err, user) => {
            if(!err && user){
                bcrypt.compare(password, user.password).then(match => {
                    if(match){
                        result.status = status;
                        result.result = user;
                    }else{
                        status = 401;
                        result.status = status;
                        result.error = 'Authentication Error';
                    }
                    res.status(status).send(result);
                }).catch(err => {
                    status = 500;
                    result.status = status;
                    result.error = err;
                    res.status(status).send(result);
                })
            }else{
                status = 404;
                result.status = status;
                result.error = err;
            }
        });
    }
}