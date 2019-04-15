const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models").User;
const User_role = require("../models").User_role;
const message = require('../errorText').messages;

module.exports = {
    add: (req, res, next) => {
        let result = {};
        let status = 201;
        const { firstName, lastName, email, password, roleId } = req.body;
        User.findOrCreate({
            where: { email: email },
            defaults: {
                firstName: firstName,
                lastName: lastName,
                password: password
            }
        })
            .then(([user, created]) => {
                console.log("")
                if (created) {
                    User_role.create({
                        user_id: user.id,
                        role_id: roleId || 2
                    })
                        .then(role => {
                            result.status = status;
                            let userRoles = [];
                            user.getRoles({ attributes: ["name"] }).then(
                                roles => {
                                    console.log("Roles :::::: ", roles);
                                    for (let i = 0; i < roles.length; ++i) {
                                        console.log("Role name ::: ",  roles[i].get("name"));
                                        userRoles.push(roles[i].get("name"));
                                    }
                                    result.result = {
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        email: user.email,
                                        roles: userRoles,
                                        message: message.registered_successfully
                                    };
                                    res.status(status).send(result);
                                }
                            ).catch(err => {
                                user.destroy({ force: true });
                                err.message = message.unknown_error;
                                next(err);
                            });
                        })
                        .catch(err => {
                            user.destroy({ force: true });
                            err.message = message.unknown_error;
                            next(err);
                        });
                } else {
                    let err = new Error(message.emails_exists);
                    err.statusCode = 400;
                    next(err);
                }
            })
            .catch(err => {
                err.message = message.unknown_error;
                next(err);
            });
    },

    login: (req, res, next) => {
        let result = {};
        let status = 200;
        const { email, password } = req.body;
        User.findOne({ where: { email: email } }).then(user => {
            if (user) {
                let userRoles = [];
                user.getRoles({ attributes: ["name"] }).then(roles => {
                    for (let i = 0; i < roles.length; ++i) {
                        userRoles.push(roles[i].get("name").toLowerCase());
                    }
                });
                bcrypt
                    .compare(password, user.password)
                    .then(match => {
                        if (match) {
                            let payload = { user: user.email, roles: userRoles};
                            console.log("UserRoles :: ", userRoles);
                            const options = { expiresIn: "1d" };
                            const secret = process.env.JWT_SECRET;
                            const token = jwt.sign(payload, secret, options);
                            const maxAge = 60*60*24*1000;

                            payload["firstName"] = user.firstName;
                            payload["lastName"] = user.lastName;
                            result.status = status;
                            result.message = message.login_success;

                            res.status(status)
                                .cookie("payload", JSON.stringify(payload), {maxAge: maxAge})
                                .cookie("token", token, {httpOnly: true, maxAge: maxAge})
                                .send(result);
                        } else {
                            let err = new Error(message.invalid_credentials);
                            err.statusCode = 401;
                            next(err);
                        }
                    })
                    .catch(err => {
                        err.message = message.unknown_error;
                        next(err);
                    });
            } else {
                err.message = message.user_not_found;
                err.statusCode = 404;
                next(err);
            }
        })
        .catch(err => {
            err.message = message.unknown_error;
            next(err);
        });
    },

    getAll: (req, res, next) => {
        let result = {};
        let status = 200;
        const payload = req.decoded;
        let role = "";
        if (payload) {
            for(let i=0; i<payload.roles.length; ++i){
                if(payload.roles[i] === "admin"){
                    role = "admin";
                    break;
                }
            }
            if(role && role==="admin"){
                User.findAll().then(users => {
                    result.status = status;
                    result.result = users;
                    res.status(status).send(result);
                });
            }else{
                let err = new Error(message.unauthorized);
                next(err);
            }
        } else {
            let err = new Error(message.token_expired);
            err.statusCode = 401;
            next(err);
        }
    }
};
