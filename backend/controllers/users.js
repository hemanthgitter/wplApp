const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        console.log("Email: ", email);
        console.log("Password: ", password);
        User.findOne({email}, (err, user) => {
            if(!err && user){
                bcrypt.compare(password, user.password).then(match => {
                    if(match){
                        let payload;
                        if(user.email === 'admin@gmail.com'){
                            payload = {"user": user.email,"roles":["admin"]};
                        }else{
                            payload = {"user": user.email,"roles":["user"]};
                        }
                        const options = { "expiresIn": "2d"};
                        const secret = process.env.JWT_SECRET;
                        const token = jwt.sign(payload, secret, options);

                        //result.token = token;
                        payload["firstName"] = user.firstName;
                        payload["lastName"] = user.lastName;
                        result.status = status;
                        //result.result = user;
                        console.log("payload::::::::::::::: ", payload);
                        
                        res.status(status).cookie('payload', JSON.stringify(payload)).cookie('token', token).send(result);
                    }else{
                        status = 401;
                        result.status = status;
                        result.error = 'Authentication Error';
                        res.status(status).send(result);
                    }
                    
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
    },

    getAll: (req, res) => {
        let result = {};
        let status = 200;
        const payload = req.decoded;
        if(payload && payload.roles[0]==='admin'){
            User.find({}, (err, users) => {
                if(!err){
                    result.status = status;
                    result.result = users;
                }else{
                    status = 500;
                    result.status = status;
                    result.error = err;
                }
                res.status(status).send(result);
            });
        }else{
            status = 401;
            result.status = status;
            result.error = `Authentication error`;
            res.status(status).send(result);
        }
    }
}