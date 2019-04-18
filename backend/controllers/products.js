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
                        category_id,
                        seller_id
                    } = req.body;
                    Product.create({
                        title: title,
                        description: description,
                        stock: stock,
                        price: price,
                        imageTitle: imageTitle,
                        image: image,
                        sellerId: seller_id
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

    updateProduct: (req, res, next) => {
        let result = {};
        let status = 200;
        const payload = req.decoded;
        if (payload) {
            for (let i = 0; i < payload.roles.length; ++i) {
                if (payload.roles[i] === "seller") {
                    const {
                        id,
                        title,
                        description,
                        stock,
                        price,
                        imageTitle,
                        image,
                        category_id
                    } = req.body;
                    console.log("category_id :::::::: ", category_id);
                    Product.update(
                        {
                            title: title,
                            description: description,
                            stock: stock,
                            price: price,
                            imageTitle: imageTitle,
                            image: image
                        },
                        {
                            where: { id: id }
                        }
                    )
                        .then(updatedProduct => {
                            Product_category.update(
                                {
                                    category_id: category_id
                                },
                                {
                                    where: { product_id: id }
                                }
                            )
                                .then(updatedCategory => {
                                    Product.findOne({
                                        where: { id: id },
                                        include: [
                                            {
                                                model: Category,
                                                attributes: ["name"]
                                            }
                                        ]
                                    }).then(product => {
                                        result.status = status;
                                        const buffer = product.image;
                                        product.image = buffer.toString();
                                        result.result = product;
                                        res.status(status).send(result);
                                    })
                                    .catch(err => {
                                        next(err);
                                    });
                                })
                                .catch(err => {
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
        const category_id = req.body.id;
        const seller_id = req.body.seller_id || null;
        let where = {} , where2 = {};
        console.log("category_id ::::: ", category_id);
        if (category_id && category_id.length > 0) {
            where["id"] = category_id;
        }
        if(seller_id){
            where2["sellerId"] = seller_id;
        }
        if (payload) {
            Product.findAll({
                where: where2,
                include: [
                    {
                        model: Category,
                        where,
                        attributes: ["name"]
                    }
                ]
            }).then(products => {
                result.status = status;
                for (let i = 0; i < products.length; ++i) {
                    const buffer = products[i].image;
                    products[i]["category"] = products[i].Categories[0].name;
                    products[i].image = buffer.toString();
                }
                result.result = products;
                res.status(status).send(result);
            });
        } else {
            let err = new Error(message.token_expired);
            err.statusCode = 401;
            next(err);
        }
    },

    getProduct: (req, res, next) => {
        let result = {};
        let status = 200;
        const payload = req.decoded;
        console.log("req.params.id ::::::::::: ", req.params.id);
        if (payload) {
            Product.findOne({
                where: { id: req.params.id },
                include: [
                    {
                        model: Category,
                        attributes: ["name"]
                    }
                ]
            }).then(product => {
                console.log("Product :::::::::::: ", product);
                result.status = status;
                const buffer = product.image;
                product.image = buffer.toString();
                result.result = product;
                res.status(status).send(result);
            });
        } else {
            let err = new Error(message.token_expired);
            err.statusCode = 401;
            next(err);
        }
    },

    deleteProduct: (req, res, next) => {
        let result = {};
        let status = 200;
        const payload = req.decoded;
        console.log("req.params.id ::::::::::: ", req.params.id);
        if (payload) {
            Product.destroy({
                where: { id: req.params.id }
            }).then(product => {
                console.log("Product :::::::::::: ", product);
                result.status = status;
                result.result = product;
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
