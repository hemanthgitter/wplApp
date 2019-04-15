const Product = require("../models").Product;
const Product_category = require("../models").Product_category;
const Category = require("../models").Category;
const message = require("../errorText").messages;

module.exports = {
    saveProduct: (req, res, next) => {
        let result = {};
        let status = 200;
        const payload = req.decoded;
        if (payload) {
            for (let i = 0; i < payload.roles.length; ++i) {
                if (payload.roles[i] === "seller") {
                    const {
                        title,
                        description,
                        stock,
                        price,
                        imageTitle,
                        image,
                        category_id
                    } = req.body;
                    Product.create({
                        title: title,
                        description: description,
                        stock: stock,
                        price: price,
                        imageTitle: imageTitle,
                        image: image
                    })
                        .then(product => {
                            Product_category.create({
                                product_id: product.id,
                                category_id: category_id
                            })
                                .then(category => {
                                    res.status(status).json(product);
                                })
                                .catch(err => {
                                    product.destroy({ force: true });
                                    err.message = message.unknown_error;
                                    next(err);
                                });
                        })
                        .catch(err => {
                            next(err);
                        });
                }
            }
        } else {
            let err = new Error(message.token_expired);
            err.statusCode = 401;
            next(err);
        }
    },

    getAllProducts: (req, res, next) => {
        let result = {};
        let status = 200;
        const payload = req.decoded;
        if (payload) {
            Product.findAll().then(products => {
                result.status = status;
                result.result = products;
                res.status(status).send(result);
            });
        } else {
            let err = new Error(message.token_expired);
            err.statusCode = 401;
            next(err);
        }
    },

    getAllCategories: (req, res, next) => {
        let result = {};
        let status = 200;
        const payload = req.decoded;
        if (payload) {
            Category.findAll().then(categories => {
                result.status = status;
                result.result = categories;
                res.status(status).send(result);
            });
        } else {
            let err = new Error(message.token_expired);
            err.statusCode = 401;
            next(err);
        }
    }
};
