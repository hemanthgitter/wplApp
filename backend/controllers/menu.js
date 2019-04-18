const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models").User;
const User_role = require("../models").User_role;
const message = require('../errorText').messages;

// To-do fetch menus from database
const adminMenu = [
    {
        "title": "Users",
        "path": "users-list",
        "prefix": "admin"
    }
];

const sellerMenu = [
    {
        "title": "Post Product",
        "path": "post-product",
        "prefix": "seller"
    },
    {
        "title": "Products List",
        "path": "all",
        "prefix": "products"
    }
];

const userMenu = [
    {
        "title": "Products List",
        "path": "all",
        "prefix": "products"
    },
    {
        "title": "Orders",
        "path": "orderList",
        "prefix": "products"
    }
];

module.exports = {

    get: (req, res, next) => {
        let result = {};
        let status = 200;
        const payload = req.decoded;
        let role = "";
        let menu = [];
        if (payload) {
            for(let i=0; i<payload.roles.length; ++i){
                if(payload.roles[i] === "admin"){
                    adminMenu.forEach(menuItem => {
                        menu.push(menuItem);
                    });
                }else if(payload.roles[i] === "seller"){
                    sellerMenu.forEach(menuItem => {
                        menu.push(menuItem);
                    })
                }else if(payload.roles[i] === "user"){
                    userMenu.forEach(menuItem => {
                        menu.push(menuItem);
                    })
                }
            }
            result.menu = menu;
            res.status(status).json(result);
        } else {
            let err = new Error(message.token_expired);
            err.statusCode = 401;
            next(err);
        }
    }
};
